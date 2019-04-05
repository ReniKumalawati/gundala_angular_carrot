import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {GroupService} from '../../service/group.service';
import {AuthenticationService} from 'src/app/service/authentication.service';
import {TransactionService} from 'src/app/service/transaction.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { group } from '@angular/animations';

@Component({
  selector: 'app-senior-manager',
  templateUrl: './senior-manager.component.html',
  styleUrls: ['./senior-manager.component.scss']
})
export class SeniorManagerComponent implements OnInit {

  // define variables
  user:any;
  memberList:any;
  groupList:any;
  groupId:any;
  shareForm: FormGroup;
  nameList:any;



  constructor(
    private employeeService: EmployeeService,
    private groupService: GroupService,
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.auth.currentEmployee());
    console.log(this.user);
    this.findGroupIdByOwner();
    
    let myMap = new Map();
    myMap.set("Ayam", [15000, 19000, 20000]);
    myMap.set("Bebek", [17000, 21000, 49999]);
    console.log(myMap);
  }

  // Ambil dari group service
  // Belum bikin
  findGroupIdByOwner(){
    this.groupService.findManagementGroupIdByOwner(this.user.id).subscribe(callback => {
      this.groupList = callback;
      // console.log(this.groupList[0].id);
      for(let group of this.groupList) {
        this.employeeService.findAllMemberOfAGroup(group.id).subscribe(callback => {
          let respons: any;
          respons = callback;
          this.memberList = respons.listEmployee;
          console.log(this.memberList);
        })
      }      
    })

  }

  // Ambil dari employee service
  findAllManagementGroupMember(groupId){
    this.employeeService.findAllMemberOfAGroup(groupId).subscribe(callback => {
      this.memberList = callback;
    })
  }

}
