import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalLoadingComponent} from '../partial/modal-loading/modal-loading.component';
import {NotificationsService} from 'angular2-notifications';

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
  load: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private login: AuthenticationService,
    private notifications: NotificationsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, ],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.modalService.open(ModalLoadingComponent);
    this.login.login(this.formLogin.email, this.formLogin.password).subscribe(callback => {
      this.employee = callback;
      this.modalService.dismissAll();
      if (this.employee.status === false) {
        this.notifications.error('Login', this.employee.message);
        location.href = '/login';
      } else {
        this.notifications.success('Login', this.employee.message);
        const emp = this.employee.employee;
        emp.token = this.employee.token;
        localStorage.setItem('currentUser', JSON.stringify(emp));
        localStorage.setItem('currentBasket', JSON.stringify(this.employee.basket));
        localStorage.setItem('currentFreezer', JSON.stringify(this.employee.freezer));
        console.log(emp.role);
        switch (emp.role) {
        case 'MANAGER' || 'SENIOR_MANAGER':
          location.href = '/manager';
          break;
        case 'ADMIN':
          location.href = '/administrator';
          break;
        case 'ROOT_ADMIN':
          location.href = '/farmer';
          break;
        default:
          location.href = '/employee';
          break;
      }
      }
    });
  }

}
