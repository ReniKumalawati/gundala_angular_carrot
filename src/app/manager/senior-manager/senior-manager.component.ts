import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {GroupService} from '../../service/group.service';
import {AuthenticationService} from 'src/app/service/authentication.service';

@Component({
  selector: 'app-senior-manager',
  templateUrl: './senior-manager.component.html',
  styleUrls: ['./senior-manager.component.scss']
})
export class SeniorManagerComponent implements OnInit {

  // define variables
  user:any;
  memberList:any;
  groupList:Object;
  groupId:any;
  // private id:string;

  constructor(
    private employeeService:EmployeeService,
    private groupService:GroupService,
    private auth:AuthenticationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.auth.currentEmployee());
    console.log(this.user);
    this.findGroupIdByOwner();
  }

  // Ambil dari group service
  // Belum bikin
  findGroupIdByOwner(){
    this.groupList = [];
    this.groupService.findManagementGroupIdByOwner(this.user.id).subscribe(callback => {
      this.groupList = callback;
      console.log(this.groupList);
    })
  }

  // Ambil dari employee service
  // findAllMemberOfAGroup(id)
  findAllGroupMember(groupId){
    
  }

  
}
