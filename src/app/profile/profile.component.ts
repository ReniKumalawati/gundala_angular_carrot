import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

//   MatchPassword(AC: AbstractControl) {
//     this.password1 = AC.get('password1').value; // to get value in input tag
//     this.password = AC.get('password').value; // to get value in input tag
//     if(this.password1 != this.password) {
//          console.log('false');
//          AC.get('password').setErrors( {MatchPassword: true} );
//      } else {
//          console.log('true');
//          return null;
//      }
//  }

  ngOnInit() {
    this.retrieveEmp();
    if (this.employee.profilePicture) {
      this.imageSrc = this.employee.profilePicture.toString();
    }

    console.log(this.imageSrc);
    this.employeeForm.profilePicture = this.imageSrc;
    this.employeeForm.address = this.employee.address;
    this.formEmployee = this.formBuilder.group({
      address: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });
    this.oldPassword = this.employee.password;
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
    console.log('password data sent: ' + JSON.stringify(this.passwordForm));
    this.emp.updateEmployeeIntoDB(this.passwordForm, this.employee.id).subscribe(callback => {
      this.employee = callback;
      this.employee = this.employee.employee;
      localStorage.setItem('currentUser', JSON.stringify(this.employee));
      console.log('new current employee:   ' + localStorage.currentUser);
      this.retrieveEmp();
      window.alert('password updated');
    });
  }

  profileSubmit() {
    this.emp.updateEmployeeIntoDB(this.employeeForm, this.employee.id).subscribe(callback => {
      if (this.base64Encode !== '') {
        this.emp.uploadEmployeeImage(this.employee.id, { img: this.base64Encode }).subscribe(callback => {
          this.employee = callback;
          this.employee = this.employee.employee;
          localStorage.setItem('currentUser', JSON.stringify(this.employee));
          console.log('new current employee:   ' + localStorage.currentUser);
          this.retrieveEmp();
          window.alert('employee data updated');
        });
      } else {
        this.employee = callback;
        this.employee = this.employee.employee;
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
    this.messageForm.reset();
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
}
