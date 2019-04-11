import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthenticationService} from './service/authentication.service';
import {NotificationsService} from 'angular2-notifications';
import {NotificationService} from './service/notification.service';
import {EmployeeService} from './service/employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdown:any = [];
  title = 'learn-angular';
  currentUrl = '';
  greetings: string[] = [];
  showConversation = false;
  ws: any;
  name: string;
  disabled: boolean;
  employee: any;

  constructor(
    private auth: AuthenticationService,
    private notification: NotificationsService,
    private notificationService: NotificationService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.currentUrl = location.pathname;
    this.findAllUnreadNotif()
    this.connect();
  }

  connect() {
    const socket = new WebSocket('ws://localhost:8787/greeting/websocket');
    this.ws = Stomp.over(socket);
    const that = this;
    this.ws.connect({}, function(frame) {
      that.ws.subscribe('/errors', function(message) {
        that.notification.error('Notification', message.body);
      });
      that.ws.subscribe('/topic/reply', function(message) {
        const pesan = JSON.parse(message.body);
        console.log(pesan);
        if (that.employee.id === pesan.owner.id) {
          if (pesan.show === true) {
            that.notification.info('Notification', pesan.detail);
            that.dropdown.push(pesan);
          } else {
            if (pesan.type === 'update') {
              that.employeeService.findBasketByEmployeeId(that.employee.id).subscribe(callback1 => {
                localStorage.setItem("currentBasket", JSON.stringify(callback1))
              })
              if (that.employee.role === 'MANAGER' || that.employee.role === 'SENIOR_MANAGER') {
                that.employeeService.findFrezeerByOwner(that.employee.id).subscribe(callback1 => {
                  localStorage.setItem("currentFreezer", JSON.stringify(callback1))
                })
              }
            }
          }
        }
      });
      that.disabled = true;
    }, function(error) {
      alert('STOMP error ' + error);
    });
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.greetings = [];
  }

  findAllUnreadNotif() {
    this.notificationService.findAllUnreadNotif(this.employee.id).subscribe(callback => {
      this.dropdown = callback;
      this.dropdown = this.dropdown.listNotification;
    })
  }

}
