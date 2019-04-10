import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../service/transaction.service';
import {EmployeeService} from '../../../service/employee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-earn-most-carrot',
  templateUrl: './earn-most-carrot.component.html',
  styleUrls: ['./earn-most-carrot.component.scss']
})
export class EarnMostCarrotComponent implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'emialAddress' },
    { name: 'Company' }
  ];
  employees: any;
  employeeForm: FormGroup;
  employeeValue = { name: '', email: '', role: ''};
  constructor(
    private transactionService: TransactionService,
    private empService: EmployeeService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.getEmployeesByCarrotEarned();
  }
  getEmployeesByCarrotEarned() {
    this.empService.showAllEmployee().subscribe(callback => {
      this.employees = callback;
      this.employees = this.employees.listEmployee
    });
  }

  open(content, data) {
    this.empService.findEmployeeById(data.id).subscribe(callback => {
      let empTemp: any;
      empTemp = callback;
      this.employeeValue.name = empTemp.employee.name;
      this.employeeValue.email = empTemp.employee.emailAddress;
      this.employeeValue.role = empTemp.employee.role;
      this.modalService.open(content);
    });
  }
}
