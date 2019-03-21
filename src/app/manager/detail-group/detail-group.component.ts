import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../service/group.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BazarService} from '../../service/bazar.service';

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
  allEmployee = [];
  bazaarData: any;
  employeeByGroup: any;
  idEmployee = [];
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private bazaarService: BazarService
  ) { }

  ngOnInit() {
    this.routeParam = this.route.params;
    this.addEmployee = this.formBuilder.group({
      employee: ['', Validators.required]
    });
    this.findGroupById();
    this.findAllBazar();
    this.findAllMemberOfAGroup();
  }

  findAllMemberOfAGroup() {
    this.employeeByGroup = [];
    this.idEmployee = [];
    this.employeeService.findAllMemberOfAGroup(this.routeParam.value.id).subscribe(callback => {
      this.employeeByGroup = callback;
      console.log(this.employeeByGroup)
      if (this.employeeByGroup != null) {
        for (let emp of this.employeeByGroup) {
          this.idEmployee.push(emp.id);
        }
        this.findAllEmployee();
      } else {
        this.findAllEmployee();
      }
    })
  }

  findAllBazar() {
    this.bazaarService.findBazarByStatus(true).subscribe(callback => {
      this.bazaarData = callback;
    })
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
      let empav : any;
      empav = callback;
      this.allEmployee = [];
      for (let emp of empav) {
        if (!this.idEmployee.includes(emp.id)) {
          this.allEmployee.push(emp);
          console.log(this.allEmployee)
        }
      }
    })
  }

  submit() {
    let data: any;
    data = [{id: this.routeParam.value.id}];
    this.employeeService.insertGroupIntoEmployee(this.employee.id, data).subscribe(callback => {
      console.log(callback)
      this.close();
      this.findAllMemberOfAGroup();
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.addEmployee.reset();
    this.modalService.dismissAll();
  }

  removeEmployeefromGroup(id) {
    this.employeeService.removeEmployeeFromGroup(id, this.itemGroup).subscribe(callback => {
      this.findAllMemberOfAGroup()
    })
  }
}
