import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/service/authentication.service';
import { EmployeeService } from 'src/app/service/employee.service';
import {TransactionService} from 'src/app/service/transaction.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss']
})
export class FunnelComponent implements OnInit {
  user: any;
  currentFreezer: any;
  employeeData: any;
  shareForm: FormGroup;
  shareValue = { from: '', to: '',
                freezer_to: {id: '', name: '', employee: {id:'', dob: '', name: ''}},
                freezer_from: {id: '', name: '', employee: {id:'', name: '', dob: '', group: []}},
                carrot_amt: 0, type: 'FUNNEL', description: ''};
  constructor(
    private auth: AuthenticationService,
    private employeeService: EmployeeService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      detail_to: ['', Validators.required],
      description: ['', Validators.required],
      carrot_amt: ['', Validators.required],
    });

    this.user = JSON.parse(this.auth.currentEmployee());
    this.currentFreezer = JSON.parse(this.auth.currentFreezer());
    this.findAllSeniorManager();
  }

  findAllSeniorManager() {
    this.employeeService.findEmployeeByRole('SENIOR_MANAGER').subscribe(callback => {
      this.employeeData = callback;
      this.employeeData = this.employeeData.listEmployee;
      console.log(this.employeeData);
    });
  }

  submit() {
    this.shareValue.freezer_from = this.currentFreezer;
    this.shareValue.from = this.user.name;
    delete this.shareValue.freezer_from.employee.dob;
    delete this.shareValue.freezer_from.employee.group;
    console.log(this.shareValue);
    this.transactionService.insertTansactionToDB(this.shareValue).subscribe(callback => {
      this.close();
      this.findAllSeniorManager();
    });
  }
  open(content) {
    this.modalService.open(content);
  }
  close() {
    this.modalService.dismissAll();
    this.shareForm.reset();
  }
}


