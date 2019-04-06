import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { GroupService } from '../../service/group.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmService } from "../../service/farm.service";
import { group } from '@angular/animations';

@Component({
  selector: 'app-senior-manager',
  templateUrl: './senior-manager.component.html',
  styleUrls: ['./senior-manager.component.scss']
})
export class SeniorManagerComponent implements OnInit {
  // define variables
  user: any;
  memberList: any;
  groupList: any;
  groupId: any;
  sendCarrotForm: FormGroup;
  nameList: any;
  receiverName: string;
  shareValue = {
    from: '',
    to: '',
    freezer_to: {
      id: '',
      name: '',
      created_at: '',
      updated_at: '',
      employee: { id: '', dob: '', name: '', group: [] }
    },
    barn: {
      id: '',
      name: '',
      owner: { id: '', name: '', dob: '', group: [] },
      startPeriod: '',
      endPeriod: '',
      totalCarrot: '',
      carrotLeft: ''
    },
    carrot_amt: 0,
    type: 'FUNNEL',
    description: ''
  };

  // Variable for transaction process
  currentFreezer: any;
  freezer: any;
  currentBarn: any;
  emp

  constructor(
    private employeeService: EmployeeService,
    private groupService: GroupService,
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private farmService: FarmService
  ) {}

  ngOnInit() {
    this.sendCarrotForm = this.formBuilder.group({
      description: ['', Validators.required],
      carrot_amt: ['', Validators.required]
    });

    this.user = JSON.parse(this.auth.currentEmployee());
    console.log(this.user);
    this.findGroupIdByOwner();
  }

  // Methods for finding group id by owner ID
  findGroupIdByOwner() {
    this.groupService
      .findManagementGroupIdByOwner(this.user.id)
      .subscribe(callback => {
        this.groupList = callback;
        // console.log(this.groupList[0].id);
        for (const group of this.groupList) {
          this.findAllManagementGroup(group.id);
        }
      });
  }

  // Methods for get all member of management group by management group id
  findAllManagementGroup(managementGroupId) {
    this.employeeService
      .findAllMemberOfAGroup(managementGroupId)
      .subscribe(callback => {
        let respons: any;
        respons = callback;
        this.memberList = respons.listEmployee;
        console.log(this.memberList);
      });
  }

  // Finding all current barn
  findCurrentBarn() {
    this.farmService.findCurrentBarns().subscribe(callback => {
      console.log(callback)
    });
  }

  // Methdos for opening Modal
  openModal(content, managerData) {
    console.log(managerData);
    this.sendCarrotForm.reset();
    this.modalService.open(content);
    console.log('open content, id = ' + managerData.id);
    console.log(managerData.name);
    this.receiverName = managerData.name;
  }

  // Methods for closing modal
  closeModal() {
    this.sendCarrotForm.reset();
    this.modalService.dismissAll();
  }

  submit() {
    this.shareValue.barn = this.currentBarn;
    this.shareValue.from = this.user.name;
    delete this.shareValue.barn.owner.dob;
    delete this.shareValue.barn.owner.group;
    this.employeeService.findFrezeerByOwner(this.empTempId).subscribe(callback => {
      this.freezer = callback;
      this.shareValue.freezer_to = this.freezer;
      delete this.shareValue.freezer_to.employee.dob;
      delete this.shareValue.freezer_to.employee.group;
      delete this.shareValue.freezer_to.created_at;
      delete this.shareValue.freezer_to.updated_at;
      delete this.shareValue.barn.startPeriod;
      delete this.shareValue.barn.endPeriod;
      console.log(this.shareValue);
      this.transactionService.insertTansactionToDB(this.shareValue).subscribe(callback => {
        this.closeModal();
        this.findAllSeniorManager();
      });
    });
  }
}
