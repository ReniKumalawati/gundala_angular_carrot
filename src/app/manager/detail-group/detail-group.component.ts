import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../service/group.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent implements OnInit {
  itemGroup: Object;
  routeParam: any;
  addEmployee: FormGroup;
  employee: any;
  allEmployee: any;
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.routeParam = this.route.params;
    this.addEmployee = this.formBuilder.group({
      employee: ['', Validators.required]
    });
    this.findGroupById();
    this.findAllEmployee();
  }

  findGroupById () {
    if (this.routeParam.value.id) {
      this.groupService.findById(this.routeParam.value.id).subscribe(callback => {
        this.itemGroup = callback;
        console.log(this.itemGroup);
      })
    }
  }

  findAllEmployee () {
    this.employeeService.findEmployeeByRole('STAFF').subscribe(callback => {
      this.allEmployee = callback;
      console.log(this.allEmployee);
    })
  }

  submit() {
    let data: any;
    data = [{id: this.routeParam.value.id}];
    this.employeeService.insertGroupIntoEmployee(this.employee.id, data).subscribe(callback => {
      console.log(callback)
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.addEmployee.reset();
    this.modalService.dismissAll();
  }
}
