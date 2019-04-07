import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { GroupService } from '../../service/group.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmService } from '../../service/farm.service';
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
  receiverId: any;
  receiverFreezer: any;
  receiverFreezerId: any;
  senderName: string; // Optional
  senderFreezerId: any;
  shareValue = {
    from: '',
    to: '',
    freezer_from: {
      id: '',
      name: '',
      created_at: '',
      updated_at: '',
      employee: { id: '', dob: '', name: '', group: [] }
    },
    freezer_to: {
      id: '',
      name: '',
      created_at: '',
      updated_at: '',
      employee: { id: '', dob: '', name: '', group: [] }
    },
    carrot_amt: 0,
    type: 'FUNNEL',
    description: ''
  };

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

    // Set sender frezeer id
    this.senderFreezerId = JSON.parse(this.auth.currentFreezer()).id;
    console.log(this.senderFreezerId);

    this.findGroupIdByOwner();
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

  // Finding all current barn
  findCurrentBarn() {
    this.farmService.findCurrentBarns().subscribe(callback => {
      console.log(callback);
    });
  }

  // Activate when submit button pressed
  submit() {
    // Set sharevalue json data
    this.shareValue.from = this.user.name;
    this.shareValue.to = this.receiverName;

    // find receiver freezer 
    this.employeeService.findFrezeerByOwner(this.receiverId).subscribe(callback => {
      // Receiver information
      this.receiverFreezer = callback;
      this.receiverFreezerId = this.receiverFreezer.id;

      // Receiver share value form 
      this.shareValue.freezer_to = this.receiverFreezerId;
      // delete this.shareValue.freezer_to.employee.dob;
      // delete this.shareValue.freezer_to.employee.group;
      // delete this.shareValue.freezer_to.created_at;
      // delete this.shareValue.freezer_to.updated_at;

      // Sender share value form
      this.shareValue.freezer_from = this.senderFreezerId;
      // delete this.shareValue.freezer_from.employee.dob;
      // delete this.shareValue.freezer_from.employee.group;
      // delete this.shareValue.freezer_from.created_at;
      // delete this.shareValue.freezer_from.updated_at;

      console.log(this.shareValue);

      // create transaction
      this.transactionService.insertTansactionToDB(this.shareValue).subscribe(transactionCallback => {
        this.closeModal();
      });
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
    this.receiverId = managerData.id;
  }

  // Methods for closing modal
  closeModal() {
    this.sendCarrotForm.reset();
    this.modalService.dismissAll();
  }
}
