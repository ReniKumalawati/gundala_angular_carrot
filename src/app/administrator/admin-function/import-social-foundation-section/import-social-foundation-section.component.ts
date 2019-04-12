import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SocialFoundationService } from "../../../service/social-foundation.service";

@Component({
  selector: "app-import-social-foundation-section",
  templateUrl: "./import-social-foundation-section.component.html",
  styleUrls: ["./import-social-foundation-section.component.scss"]
})

export class ImportSocialFoundationSectionComponent implements OnInit {
  sfTemp: Object;
  submitted = false;
  socialFoundationData: any;
  messageForm: FormGroup;
  imageSource: string;
  base64Image: string;

  formSocialFoundation = {
    name: '',
    description: '',
    min_carrot: '',
    total_carrot: 0,
    status: false,
    id: ''
  };

  constructor(
    private data: SocialFoundationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      min_carrot: ['', Validators.required]
      // pictureUrl: ['', Validators.required]
    });
    this.findAllSocialFoundation();
  }

  findAllSocialFoundation() {
    this.data.findAllSocialFoundation().subscribe(callback => {
      this.socialFoundationData = callback;
      this.socialFoundationData = this.socialFoundationData.listSocialFoundation;
      // console.log("dddd");
    });
  }

  open(content) {
    // console.log(content);
    // this.imageSource = '';
    this.modalService.open(content);
  }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
    this.sfTemp = undefined;
    this.imageSource = ''; 
  }

  submit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      // alert('please fulfill the form first');
      return;
    }
    
    console.log(this.formSocialFoundation.id);
    if (this.formSocialFoundation.id != undefined && this.formSocialFoundation.id != '') {
      let id: any;
      id = this.formSocialFoundation.id;
      delete this.formSocialFoundation.id;
      this.data.updateSocialFoundation(this.formSocialFoundation, id).subscribe(callback => {
          let kembalian: any;
          kembalian = callback;
          console.log(kembalian);
          if (this.base64Image !== '' || this.base64Image !== null ) {
            this.data.uploadImage(id, { img : this.base64Image }).subscribe(imageCallback => {
              // console.log('base64 not ""  and not null')
              id = '';
              this.findAllSocialFoundation();
              this.base64Image = '';
              // console.log('base64' + this.base64Image);
              // this.imageSource = '';
              this.close();
            });
          } else {
            // console.log('base64 gaada')
            id = '';
            this.findAllSocialFoundation();
            this.close();
          }
        });
    } else {
      console.log('lari kesini')
      delete this.formSocialFoundation.id;
      this.data.insertSocialFoundationIntoDB(this.formSocialFoundation).subscribe(callback => {
          let kembalian: any;
          kembalian = callback;

          if (this.base64Image !== '' || this.base64Image !== null) {
            this.data.uploadImage(kembalian.socialFoundation.id, { img : this.base64Image }).subscribe(imageCallback => {
              this.findAllSocialFoundation();
              this.base64Image = '';
              // this.imageSource = '';
              this.close();
            });
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
    this.data.updateSocialFoundation(socialFoundation, socialFoundation.id).subscribe(callback => {
        this.findAllSocialFoundation();
        this.close();
      });
  }

  openEditModal(data, content) {
    // console.log(content);
    this.sfTemp = data.id;
    this.formSocialFoundation.name = data.name;
    this.formSocialFoundation.description = data.description;
    this.formSocialFoundation.min_carrot = data.min_carrot;
    this.formSocialFoundation.status = data.status;
    this.formSocialFoundation.id = data.id;
    this.imageSource = data.pictureUrl;
    // console.log(this.imageSource);
    this.open(content);
    // this.imageSource = '';
  }

  removeSocialFoundationFromDB(id) {
    this.data.deleteSocialFoundationFromDB(id).subscribe(callback => {
      this.findAllSocialFoundation();
      this.close();
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSource = reader.result.toString();
        this.base64Image = reader.result.toString().split(',')[1];
        console.log(this.base64Image);
      };
    }
  }
}
