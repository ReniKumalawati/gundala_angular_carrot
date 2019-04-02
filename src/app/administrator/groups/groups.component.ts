import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../service/group.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupData: any;
  groupForm: FormGroup;
  groupValue: any = {name: '', type: '', id: '', owner: {id: ''}}
  submitted = false;
  manager: any;
  idOwner = '';
  id = '';
  constructor(
    private groupService: GroupService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      owner: ['', Validators.required]
    });
    this.findAllGroups();
    this.findAllEmployeeByStatus()
  }

  findAllEmployeeByStatus() {
    this.employeeService.findEmployeeByRole('MANAGER').subscribe(callback => {
      this.manager = callback;
      console.log(callback)
    });
  }

  findAllGroups () {
    this.groupData = [];
    this.groupService.findAllGroup().subscribe(callback => {
      this.groupData = callback;
    })
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.id = '';
    this.groupForm.reset();
    this.modalService.dismissAll();
  }
  submit () {
    console.log(this.id)
    if (this.id !== '') {
      delete this.groupValue.id
      this.groupValue.owner.id = this.idOwner
      this.groupService.updateGroup(this.id, this.groupValue).subscribe(callback => {
        this.id = ''
        this.findAllGroups();
        this.close();
      })
    } else {
      delete this.groupValue.id;
      this.groupService.insertGroupToDB(this.groupValue).subscribe(callback => {
        this.findAllGroups();
        this.close();
      })
    }
  }

  openEdit(data, content) {
    delete data.owner
    this.id = data.id;
    this.groupValue = data
    if (!this.groupValue.owner) {
      this.groupValue.owner = {id: ''}  
    }
    this.open(content);
  }
}
