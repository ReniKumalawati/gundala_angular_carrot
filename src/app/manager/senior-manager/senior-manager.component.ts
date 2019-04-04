import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-senior-manager',
  templateUrl: './senior-manager.component.html',
  styleUrls: ['./senior-manager.component.scss']
})
export class SeniorManagerComponent implements OnInit {

  // define variables
  memberList:any;
  groupId:any;

  constructor(
    private employeeService:EmployeeService,
    private groupService:GroupService
  ) { }

  ngOnInit() {
  }

  // Ambil dari group service
  // Belum bikin
  findGroupIdByOwner(){

  }

  // Ambil dari employee service
  // findAllMemberOfAGroup(id)
  findAllGroupMember(){
    
  }
}
