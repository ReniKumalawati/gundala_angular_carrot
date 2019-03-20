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
  employeeForm = {address: '', password: '', profilePicture: '', emailAddress: ''};
  constructor(
    private emp: ProfileService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    ) {}

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.renewLocalStorage();
    this.employeeForm.profilePicture = this.employee.profilePicture;
    this.employeeForm.address = this.employee.address;
    this.employeeForm.password = this.employee.password;
    this.formEmployee = this.formBuilder.group({
      address: ['', Validators.required],
      password: ['', Validators.required],
      profilePicture:  ['', Validators.required]
    });
  }

  profileSubmit() {
    // console.log('submit - previous data' + JSON.stringify(employee));
    this.emp.updateEmployeeIntoDB(this.employeeForm, this.employee.id).subscribe();
    this.renewLocalStorage();
    console.log('new current employee:   ' + localStorage.currentUser);

    // console.log("submit - updated employee" + JSON.stringify(this.employee));
  }

  renewLocalStorage() {
    this.emp.login(this.employee.emailAddress, this.employeeForm.password).subscribe(callback => {
    //   console.log('login callback   ' + callback);
    //   console.log('login callback   ' + JSON.stringify(callback));
    //   debugger;
    //   this.employee = callback;
    //   localStorage.setItem('currentUser', this.employee.employee);
    // });
    this.emp.findEmployeeById(this.employee.id).subscribe(callback => {
      console.log('callback   ' + callback);
      console.log('callback   ' + JSON.stringify(callback));
      this.employee = callback;
      console.log('findEmployeeById:   s' + JSON.stringify(this.employee));
      console.log('findEmployeeById:   p' + JSON.parse(this.employee));
      localStorage.setItem('currentUser', JSON.parse(this.employee));
      // localStorage.setItem("currentUser", JSON.stringify(this.employee));
    });
    })
  }

  backToEmployee() {
    location.href = 'employee';
  }
}
