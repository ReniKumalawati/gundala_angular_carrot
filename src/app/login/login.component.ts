import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalLoadingComponent} from '../partial/modal-loading/modal-loading.component';

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
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.modalService.open(ModalLoadingComponent)
    this.login.login(this.formLogin.email, this.formLogin.password).subscribe(callback => {
      this.employee = callback;
      this.modalService.dismissAll()
      if (this.employee.status === 'gagal') {
        alert(this.employee.message);
        location.href = '/login';
      } else {
        let emp = JSON.parse(this.employee.employee)
        emp.token = this.employee.token
        localStorage.setItem('currentUser', JSON.stringify(emp));
        localStorage.setItem('currentBasket', this.employee.basket);
        localStorage.setItem('currentFreezer', this.employee.freezer);
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
