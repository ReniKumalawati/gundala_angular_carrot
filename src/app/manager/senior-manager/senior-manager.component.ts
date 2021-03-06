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
  senderFreezer: any;
  senderFreezerId: any;
  currentBarn: any;
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
    this.senderFreezer = JSON.parse(this.auth.currentFreezer());
    // console.log(this.senderFreezer);
    this.senderFreezerId = this.senderFreezer.id;
    // console.log(this.senderFreezerId);

    this.findGroupIdByOwner();
    this.findCurrentBarn();
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
  findCurrentBarn() {
    this.farmService.findCurrentBarns().subscribe(callback => {
      this.currentBarn = callback;
      console.log(callback)
    })
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
      this.shareValue.freezer_to = this.receiverFreezer;
      // console.log(this.shareValue.freezer_to);

      // Sender share value form
      this.shareValue.freezer_from = this.senderFreezer;
      // console.log(this.shareValue.freezer_from);

      console.log(this.shareValue);

      // create transaction
      this.transactionService.insertTansactionToDB(this.shareValue).subscribe(transactionCallback => {
        this.closeModal();
      });
    });
  }


  // Methdos for opening Modal
  openModal(content, managerData) {
    this.receiverName = managerData.name;
    this.receiverId = managerData.id;
    let listGroup: any;
    /*console.log(managerData);*/

    /*console.log('open content, id = ' + managerData.id);
    console.log(managerData.name);*/
    this.groupService.findGroupIdByOwner(this.receiverId).subscribe( callback1 => {
      listGroup = callback1;
      console.log(listGroup[0].id);
      this.groupService.findStaffSum(listGroup[0].id).subscribe(callback2 => {
        let staffSum: any = callback2;
        console.log(staffSum);
        this.shareValue.carrot_amt = Math.floor(staffSum*this.currentBarn.budgetPerStaff*3/4);
        this.sendCarrotForm.reset();
        this.modalService.open(content);
      });
    });

  }

  // Methods for closing modal
  closeModal() {
    this.sendCarrotForm.reset();
    this.modalService.dismissAll();
  }
}
