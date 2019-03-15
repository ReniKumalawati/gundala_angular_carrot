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
      this.employee = callback
      localStorage.setItem("currentUser", this.employee.employee)
    })
  }

}
