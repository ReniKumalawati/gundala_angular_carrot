import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, Form} from '@angular/forms';
import { from } from 'rxjs';
import { NewsletterService } from '../service/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  currentUser: any;
  // name: string;
  submitted = false;
  form: FormGroup;
  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview','codeBlock']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['link']],
      ['customButtons', ['testBtn']]
    ]
  };

  newsletterValue = {
    newsletterSubject: '',
    newsletterContent: '',
    senderName: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private newsletterService: NewsletterService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.newsletterValue.senderName = this.currentUser.name;
    console.log(this.newsletterValue.senderName);

    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  postNewsletter(data) {
    this.newsletterService.postNewsletter(data).subscribe(callback => {
      let postData: any = callback;
      console.log(postData);
    });
  }

  onSubmit() {
    this.submitted = true;
    // this.newsletterService.postNewsletter(data).subscribe()
    if (this.form.invalid) {
      console.log('form invalid')
      return;
    }

    // console.log('disini' + this.newsletterValue.newsletterSubject + "   " + this.newsletterValue.newsletterContent);

    // Post newsletter to all employee
    this.postNewsletter(this.newsletterValue);
    console.log('sent!!!')
    
    // Clear up the values
    this.newsletterValue.newsletterSubject = '';
    this.newsletterValue.newsletterContent = '';
  }
}
