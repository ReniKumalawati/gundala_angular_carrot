import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AuthenticationService} from './service/authentication.service';
import {NotificationsService} from 'angular2-notifications';
import {NotificationService} from './service/notification.service';
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
    private notificationService: NotificationService
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
        alert('Error ' + message.body);
      });
      that.ws.subscribe('/topic/reply', function(message) {
        const pesan = JSON.parse(message.body);
        if (that.employee.id === pesan.owner.id) {
          that.notification.info('Notification', pesan.detail);
          that.dropdown.push(pesan);
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
