import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  employee: any;
  employeeData: Object;
  formEmployee: FormGroup;
  employeeForm = {address: '', password: '', profilePicture: ''};
  constructor(
    private emp: ProfileService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    ) {}

  ngOnInit() {
    this.retrieveEmp();
    this.employeeForm.profilePicture = this.employee.profilePicture;
    this.employeeForm.address = this.employee.address;
    this.employeeForm.password = this.employee.password;
    this.formEmployee = this.formBuilder.group({
      address: ['', Validators.required],
      password: ['', Validators.required],
      profilePicture:  ['', Validators.required]
    });
  }

  retrieveEmp () {
    this.employee = JSON.parse(this.auth.currentEmployee());
    if (typeof this.employee.dob == 'string') {
      let split = this.employee.dob.split('-');
      this.employee.dob = {year: split[0], month: split[1], day: split[2]}
    }
  }

  profileSubmit() {
    this.emp.updateEmployeeIntoDB(this.employeeForm, this.employee.id).subscribe(callback => {
      this.employee = callback;
      localStorage.setItem('currentUser', JSON.stringify(this.employee));
      console.log('new current employee:   ' + localStorage.currentUser);
      this.retrieveEmp();
    });

  }

  backToEmployee() {
    location.href = 'employee';
  }
}
