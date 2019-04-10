import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private emp: ProfileService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private notification: NotificationsService,
  ) { }
  employee: any;
  employeeData: Object;
  formEmployee: FormGroup;
  formPassword: FormGroup;
  base64Encode = '';
  imageSrc: any;
  messageForm: FormGroup;
  oldPassword: any;
  password1: any;
  password: any;
  employeeForm = { address: '', profilePicture: '' };
  passwordForm = { password: '' };
  match= true;
  match1= true;

  ngOnInit() {
    this.retrieveEmp();
    if (this.employee.profilePicture) {
      this.imageSrc = this.employee.profilePicture.toString();
    }
    this.employeeForm.profilePicture = this.imageSrc;
    this.employeeForm.address = this.employee.address;
    this.formEmployee = this.formBuilder.group({
      address: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });
    this.formPassword = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  retrieveEmp() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    if (typeof this.employee.dob == 'string') {
      let split = this.employee.dob.split('-');
      this.employee.dob = { year: split[0], month: split[1], day: split[2] };
    }
  }

  passwordSubmit() {
    if (this.match == true && this.match1 == true) {
      let token = this.employee.token
      this.emp.updateEmployeeIntoDB({password: this.password}, this.employee.id).subscribe(callback => {
        this.employee = callback;
        this.employee = this.employee.employee;
        this.employee.token = token
        localStorage.setItem('currentUser', JSON.stringify(this.employee));
        this.retrieveEmp();
        this.close()
        this.notification.info('Update', 'password updated');
      });
    }
    // console.log('password data sent: ' + JSON.stringify(this.passwordForm));
  }

  profileSubmit() {
    let token = this.employee.token
    this.emp.updateEmployeeIntoDB(this.employeeForm, this.employee.id).subscribe(callback => {
      if (this.base64Encode !== '') {
        this.emp.uploadEmployeeImage(this.employee.id, { img: this.base64Encode }).subscribe(callback => {
          this.employee = callback;
          this.employee = this.employee.employee;
          this.employee.token = token
          localStorage.setItem('currentUser', JSON.stringify(this.employee));
          console.log('new current employee:   ' + localStorage.currentUser);
          this.retrieveEmp();
          window.alert('employee data updated');
        });
      } else {
        this.employee = callback;
        this.employee = this.employee.employee;
        this.employee.token = token
        localStorage.setItem('currentUser', JSON.stringify(this.employee));
        console.log('new current employee:   ' + localStorage.currentUser);
        this.retrieveEmp();
        window.alert('employee data updated');
      }
    });
  }

  backToEmployee() {
    location.href = 'employee';
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.oldPassword = ''
    this.password = ''
    this.password1 = ''
    this.modalService.dismissAll();
  }

  onFileChange(event) {
    console.log('but why');
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result.toString();
        this.base64Encode = reader.result.toString().split(',')[1];
      };
    }
  }
  checkOld() {
    if (this.oldPassword != this.employee.password) {
      this.match = false;
    } else {
      this.match = true;
    }
  }
  checknew() {
    if (this.password != this.password1) {
      this.match1 = false;
    } else {
      this.match1 = true;
    }
  }
}
