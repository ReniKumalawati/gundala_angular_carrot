import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SocialFoundationService} from '../../service/social-foundation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {TransactionService} from '../../service/transaction.service';

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
  constructor(
    private route: ActivatedRoute,
    private sfService: SocialFoundationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private transactionService: TransactionService
    ) { }

  ngOnInit() {
    this.routeParam = this.route.params;
    this.sfForm = this.formBuilder.group({
      carrot: ['', Validators.required]
    });
    this.user = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());
    this.findSFbyId()
  }

  findSFbyId() {
    if (this.routeParam.value.id) {
      this.sfService.findSFById(this.routeParam.value.id).subscribe(callback => {
        this.sf = callback;
        this.sf = this.sf.socialFoundation
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
    let shareValue = {from: this.user.name, to: this.data.name,
      detail_from: this.basket,
      carrot_amt: parseInt(this.carrot), type: 'DONATION', description: 'donate to ' + this.data.name, socialFoundation: {id: this.data.id, name: this.data.name}};
    delete shareValue.detail_from.employee.dob
    delete shareValue.detail_from.employee.group
    this.transactionService.insertTansactionToDB(shareValue).subscribe(callback => {
      let hasil:any = callback
      this.close();
      alert(hasil.message)
      // location.href = '/transaction-histories'
    });
  }

}
