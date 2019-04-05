import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {EmployeeService} from '../../service/employee.service';
import {TransactionService} from '../../service/transaction.service';
import {GroupService} from '../../service/group.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SocialFoundationService} from '../../service/social-foundation.service';

@Component({
  selector: 'app-sf-list',
  templateUrl: './sf-list.component.html',
  styleUrls: ['./sf-list.component.scss']
})
export class SfListComponent implements OnInit {

  sfdata:any
  constructor(
    private sfService: SocialFoundationService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.findAllSF();
  }

  findAllSF() {
    this.sfService.findAllSocialFoundation().subscribe(callback => {
      this.sfdata = callback;
      this.sfdata = this.sfdata.listSocialFoundation;
    });
  }

  approve(id) {
    this.transactionService.approveDonation(id).subscribe(callback => {
      let kembalian:any = callback;
      alert(kembalian.message)
      console.log(callback)
    })
  }
}
