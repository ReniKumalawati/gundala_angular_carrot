import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SocialFoundationService} from '../../service/social-foundation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {TransactionService} from '../../service/transaction.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-detail-sf',
  templateUrl: './detail-sf.component.html',
  styleUrls: ['./detail-sf.component.scss']
})
export class DetailSFComponent implements OnInit {
  routeParam: any;
  sf: any;
  sfForm: FormGroup;
  carrot: any;
  data: any;
  user: any;
  basket: any;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private sfService: SocialFoundationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private transactionService: TransactionService,
    private notif: NotificationsService
    ) { }

  ngOnInit() {
    this.routeParam = this.route.params;
    this.user = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());
    this.findSFbyId()
    this.sfForm = this.formBuilder.group({
      carrot: ['', [Validators.pattern("^[0-9]*$"),
        Validators.required, Validators.min(0),
        Validators.max(this.basket.carrot_amt)]]
    });
  }

  findSFbyId() {
    if (this.routeParam.value.id) {
      this.sfService.findSFById(this.routeParam.value.id).subscribe(callback => {
        this.sf = callback;
        this.sf = this.sf.socialFoundation
        if (this.sf.pictureUrl == null) {
          this.sf.pictureUrl = 'assets/img/heart.svg'
        }
      })
    }
  }

  openmodal(content, data) {
    this.modalService.open(content)
    this.data = data
  }

  close() {
    this.modalService.dismissAll()
    this.carrot = '0'
    this.data = {}
  }

  submit() {
    this.submitted = true;
    if (this.sfForm.invalid) {
      return;
    }
    let shareValue = {from: this.user.name, to: this.data.name,
      detail_from: this.basket,
      carrot_amt: parseInt(this.carrot), type: 'DONATION', description: 'donate to ' + this.data.name, socialFoundation: {id: this.data.id, name: this.data.name}};
    delete shareValue.detail_from.employee.dob
    delete shareValue.detail_from.employee.group
    this.transactionService.insertTansactionToDB(shareValue).subscribe(callback => {
      let hasil:any = callback
      this.close();
      if (hasil.status) {
        this.notif.success("Donation", hasil.message)
      } else {
        this.notif.error("Donation", hasil.message)
      }

      location.href = '/transaction-histories'
    });
  }

}
