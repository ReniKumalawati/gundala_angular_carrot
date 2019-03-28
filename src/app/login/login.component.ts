import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  employee: any;
  submitted = false;
  formLogin = {email: '', password: ''}
  constructor(private formBuilder: FormBuilder, private login: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.login.login(this.formLogin.email, this.formLogin.password).subscribe(callback => {
      this.employee = callback;
      if (this.employee.status === 'gagal') {
        alert(this.employee.message);
        location.href = '/login';
      } else {
        localStorage.setItem("currentUser", this.employee.employee);
      localStorage.setItem("currentBasket", this.employee.basket);
      switch (this.employee.role) {
        case 'MANAGER':
          location.href = '/manager';
          break;
        case 'ADMIN':
          location.href = '/administrator';
          break;
        case 'ROOT_ADMIN':
          location.href = '/';
          break;
        default:
          location.href = '/employee';
          break;
      }
      }
    });
  }

}
