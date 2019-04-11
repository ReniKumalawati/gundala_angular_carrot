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
  name: string;

  form: FormGroup;

  newsletterForm: {
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
    console.log(this.currentUser.name);
    this.name = this.currentUser.name;

    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  sendNewsletter() {
    // this.newsletterService.postNewsletter(data).subscribe()
  }
}
