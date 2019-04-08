import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SocialFoundationService } from '../../../service/social-foundation.service';


@Component({
  selector: 'app-import-social-foundation-section',
  templateUrl: './import-social-foundation-section.component.html',
  styleUrls: ['./import-social-foundation-section.component.scss']
})
export class ImportSocialFoundationSectionComponent implements OnInit {
  sfTemp: Object;
  socialFoundationData: any;
  messageForm: FormGroup;
  formSocialFoundation = {name: '', description: '', min_carrot: '', total_carrot: 0, status: false, id: ''};
  constructor(
    private data: SocialFoundationService, 
    private modalService: NgbModal, 
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    console.log('cccccc');
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      min_carrot: ['', Validators.required],
    });
    this.findAllSocialFoundation();
  }
  findAllSocialFoundation() {
    this.data.findAllSocialFoundation().subscribe(callback => {
      this.socialFoundationData = callback;
      this.socialFoundationData = this.socialFoundationData.listSocialFoundation
      console.log('dddd');
    });
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
    this.sfTemp = undefined;
  }

  submit() {
    if (this.messageForm.invalid) {
      alert('please fulfill the form first');
      return;
    }
    console.log(this.formSocialFoundation.id)
    if (this.formSocialFoundation.id != undefined && this.formSocialFoundation.id != '') {
      let id: any;
      id = this.formSocialFoundation.id;
      delete this.formSocialFoundation.id;
      this.data.updateSocialFoundation(this.formSocialFoundation, id).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllSocialFoundation();
        this.close();
      });
    } else {
      delete this.formSocialFoundation.id;
      this.data.insertSocialFoundationIntoDB(this.formSocialFoundation).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllSocialFoundation();
        this.close();
      });
    }
  }

  active(socialFoundation, status) {
    if (status) {
      socialFoundation.status = true;
    } else {
      socialFoundation.status = false;
    }

    console.log(socialFoundation);
    this.data.updateSocialFoundation(socialFoundation, socialFoundation.id).subscribe(callback => {
      this.findAllSocialFoundation();
      this.close();
    });
  }

  openEditModal(data, content) {
    this.sfTemp = data.id;
    this.formSocialFoundation.name = data.name;
    this.formSocialFoundation.description = data.description;
    this.formSocialFoundation.min_carrot = data.min_carrot;
    this.formSocialFoundation.status = data.status;
    this.formSocialFoundation.id = data.id;
    this.open(content);
  }

  removeSocialFoundationFromDB(id) {
    this.data.deleteSocialFoundationFromDB(id).subscribe(callback => {
      this.findAllSocialFoundation();
      this.close();
    })
  }

}
