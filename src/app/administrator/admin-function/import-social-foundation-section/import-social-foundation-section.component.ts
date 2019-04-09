import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SocialFoundationService } from '../../../service/social-foundation.service';

@Component({
  selector: "app-import-social-foundation-section",
  templateUrl: "./import-social-foundation-section.component.html",
  styleUrls: ["./import-social-foundation-section.component.scss"]
})
export class ImportSocialFoundationSectionComponent implements OnInit {
  id:any;
  socialFoundation:any;
  sfTemp: Object;
  submitted = false;
  socialFoundationData: any;
  messageForm: FormGroup;
  base64Image: string;
  imageSrc: any;

  formSocialFoundation = {
    name: '',
    description: '',
    pictureUrl: '',
    min_carrot: '',
    total_carrot: 0,
    status: false,
    id: ''
  };

  constructor(
    private socialFoundationService: SocialFoundationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pictureUrl: ['', Validators.required],
      min_carrot: ['', Validators.required]
    });
    this.findAllSocialFoundation();
  }

  findAllSocialFoundation() {
    this.socialFoundationService.findAllSocialFoundation().subscribe(callback => {
      this.socialFoundationData = callback;
      this.socialFoundationData = this.socialFoundationData.listSocialFoundation;
      // console.log("dddd");
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  // retrieveSocialFoundation() {
  //   this.socialFou
  // }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
    this.sfTemp = undefined;
  }

  submit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      // alert('please fulfill the form first');
      return;
    }
    console.log(this.formSocialFoundation.id);
    if (this.formSocialFoundation.id != undefined && this.formSocialFoundation.id != "") {
      // let id: any;
      this.id = this.formSocialFoundation.id;
      delete this.formSocialFoundation.id;
      this.socialFoundationService.updateSocialFoundation(this.formSocialFoundation, this.id).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        console.log(kembalian);
        if (this.base64Image !== '') {
            this.socialFoundationService.uploadImage(this.id, {img : this.base64Image}).subscribe(imageCallback => {
              this.id = '';
              this.findAllSocialFoundation();
              this.close();
            });
          } else {
            this.findAllSocialFoundation();
            this.close();
          }
          // let kembalian: any;
          // kembalian = callback;
          // console.log(kembalian);
          // this.findAllSocialFoundation();
          // this.close();
        });
    } else {
      delete this.formSocialFoundation.id;
      this.socialFoundationService.insertSocialFoundationIntoDB(this.formSocialFoundation).subscribe(callback => {
          let kembalian: any;
          kembalian = callback;
          if(this.base64Image !== '') {
            this.socialFoundationService.uploadImage(this.id, {img : this.base64Image}).subscribe(imageCallback => {
              this.findAllSocialFoundation();
              this.close();
            })
          } else {
            this.findAllSocialFoundation();
            this.close();
          }
          // this.findAllSocialFoundation();
          // this.close();
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
    this.socialFoundationService
      .updateSocialFoundation(socialFoundation, socialFoundation.id)
      .subscribe(callback => {
        this.findAllSocialFoundation();
        this.close();
      });
  }

  openEditModal(data, content) {
    console.log(data);
    this.sfTemp = data.id;
    this.formSocialFoundation.name = data.name;
    this.formSocialFoundation.description = data.description;
    this.formSocialFoundation.pictureUrl = data.pictureUrl;
    this.formSocialFoundation.min_carrot = data.min_carrot;
    this.formSocialFoundation.status = data.status;
    this.formSocialFoundation.id = data.id;
    this.open(content);
    // console.log(this.formSocialFoundation);
  }

  removeSocialFoundationFromDB(id) {
    this.socialFoundationService.deleteSocialFoundationFromDB(id).subscribe(callback => {
      this.findAllSocialFoundation();
      this.close();
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result.toString();
        this.base64Image = reader.result.toString().split(',')[1];
      };
    }
  }

}