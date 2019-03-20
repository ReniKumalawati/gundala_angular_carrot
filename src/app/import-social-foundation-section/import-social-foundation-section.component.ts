import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SocialFoundationService } from '../service/social-foundation.service';


@Component({
  selector: 'app-import-social-foundation-section',
  templateUrl: './import-social-foundation-section.component.html',
  styleUrls: ['./import-social-foundation-section.component.scss']
})
export class ImportSocialFoundationSectionComponent implements OnInit {
  socialFoundationData: Object;
  messageForm: FormGroup;
  formSocialFoundation = {name: '', description: '', min_carrot: '', total_carrot: 0, active: false, id: ''};
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
      console.log('dddd');
    });
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.modalService.dismissAll();
  }

  submit() {
    delete this.formSocialFoundation.id;
    this.data.insertSocialFoundationIntoDB(this.formSocialFoundation).subscribe(callback => {
      this.findAllSocialFoundation();
      this.close();
    });
  }

  active(socialFoundation, active) {
    if (active) {
      socialFoundation.active = true;
    } else {
      socialFoundation.active = false;
    }

    console.log(socialFoundation);
    this.data.updateSocialFoundation(socialFoundation, socialFoundation.id).subscribe(callback => {
      this.findAllSocialFoundation();
      this.close();
    });
  }

  openEditModal(data, content) {
    this.formSocialFoundation.name = data.name;
    this.formSocialFoundation.description = data.description;
    this.formSocialFoundation.min_carrot = data.min_carrot;
    this.formSocialFoundation.active = data.active;
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
