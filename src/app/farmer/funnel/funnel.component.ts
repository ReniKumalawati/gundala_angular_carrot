import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'src/app/service/authentication.service';
import { EmployeeService } from 'src/app/service/employee.service';
import {TransactionService} from 'src/app/service/transaction.service';
import {FarmService} from "../../service/farm.service";
import {GroupService} from '../../service/group.service';
//
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {group} from '@angular/animations';


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
  empTempId: any;
  freezer: any;
  currentBarn: any;
  shareValue = { from: '', to: '',
                freezer_to: {id: '', name: '', created_at: '', updated_at: '', employee: {id: '', dob: '', name: '', group: []}},
                barn: {id: '', name: '', owner: {id: '', name: '', dob: '', group: []}, startPeriod:'', endPeriod:'', totalCarrot:'', carrotLeft:''},
                carrot_amt: 0, type: 'FUNNEL', description: ''};
  constructor(
    private auth: AuthenticationService,
    private employeeService: EmployeeService,
    private transactionService: TransactionService,
    private farmService: FarmService,
    private groupService: GroupService,
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
    this.findCurrentBarn();
  }

  findAllSeniorManager() {
    this.employeeService.findEmployeeByRole('SENIOR_MANAGER').subscribe(callback => {
      this.employeeData = callback;
      this.employeeData = this.employeeData.listEmployee;
    });
  }

  findCurrentBarn() {
    this.farmService.findCurrentBarns().subscribe(callback => {
      this.currentBarn = callback;
      console.log(callback)
    })
  }
  submit() {
    this.shareValue.barn = this.currentBarn;
    this.shareValue.from = this.user.name;

    delete this.shareValue.barn.owner.dob;
    delete this.shareValue.barn.owner.group;
    this.employeeService.findFrezeerByOwner(this.empTempId).subscribe(callback => {
      this.freezer = callback;
      this.shareValue.freezer_to = this.freezer;
      this.shareValue.to = this.freezer.employee.name;
      delete this.shareValue.freezer_to.employee.dob;
      delete this.shareValue.freezer_to.employee.group;
      delete this.shareValue.freezer_to.created_at;
      delete this.shareValue.freezer_to.updated_at;
      delete this.shareValue.barn.startPeriod;
      delete this.shareValue.barn.endPeriod;
      console.log(this.shareValue);
      this.transactionService.insertTansactionToDB(this.shareValue).subscribe(callback => {
        this.close();
        this.findAllSeniorManager();
      });
    });
  }
/*  findSum(): number {
    return
  }*/
  open(content, data) {
    console.log(data);
    this.empTempId = data.id;
    console.log(this.empTempId);
    let listGroup: any;

    this.groupService.findGroupIdByOwner(this.empTempId).subscribe( callback1 => {
      listGroup = callback1;
      console.log(listGroup[0].id);
      this.groupService.findStaffSum(listGroup[0].id).subscribe(callback3 => {
        let staffSum: any = callback3;
        console.log(staffSum);
        this.shareValue.carrot_amt = Math.floor(staffSum*this.currentBarn.budgetPerStaff*3/4);
        this.modalService.open(content);
      });
    });
  }
  close() {
    this.modalService.dismissAll();
    this.shareForm.reset();
  }
}


