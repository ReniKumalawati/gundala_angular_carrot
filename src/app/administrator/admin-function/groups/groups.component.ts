import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../service/group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  dn = ['MANAGEMENT', 'STAFF'];
  type = '';

  groupData: any;
  groupForm: FormGroup;
  groupValue: any = { name: '', type: '', id: '', owner: { id: '' } };
  submitted = false;
  manager: any;
  seniorManager: any;
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
    this.findAllManager();
    this.findAllSeniorManager();
  }

  findAllManager() {
    this.employeeService.findEmployeeByRole('MANAGER').subscribe(callback => {
      var a = JSON.stringify(callback);
      var b = JSON.parse(a);
      this.manager = b.listEmployee;
    });
  }
  findAllSeniorManager() {
    this.employeeService.findEmployeeByRole('SENIOR_MANAGER').subscribe(callback => {
      var a = JSON.stringify(callback);
      var b = JSON.parse(a);
      this.seniorManager = b.listEmployee;
    });
  }

  findAllGroups() {
    this.groupData = [];
    this.groupService.findAllGroup().subscribe(callback => {
      var a = JSON.stringify(callback);
      var b = JSON.parse(a);
      this.groupData = b.listGroup;
    })
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    // this.id = '';
    this.groupForm.reset();
    this.modalService.dismissAll();
  }

  detect(e) {
    let split = e.split(' ');
    if (split.length > 1) {
      this.type = split[1]
    } else {
      this.type = ''
    }
  }

  submit() {
    console.log(this.id);
    if (this.id !== '') {
      delete this.groupValue.id;
      this.groupValue.owner.id = this.idOwner;
      this.groupService.updateGroup(this.id, this.groupValue).subscribe(callback => {
        this.id = '';
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
    // delete data.owner;
    this.id = data.id;
    this.groupValue = data;
    if (!this.groupValue.owner) {
      this.groupValue.owner = { id: '' }
    }
    this.open(content);
  }
}
