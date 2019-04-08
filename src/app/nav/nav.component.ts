import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../service/notification.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input('dropdown') dropdown:any;
  @Output() allData: EventEmitter<any> = new EventEmitter();
  appTitle = 'Mitrais Carrot';
  jsonNav: any;
  navEmp: any;
  msg:any = '';
  constructor(
    private modal: NgbModal,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    const pillElementMgr = document.querySelector('#linkManager');
    const pillElementEmp = document.querySelector('#linkEmployee');
    const pillElementMrc = document.querySelector('#linkMerchant');
    const pillElementFrm = document.querySelector('#linkFarmer');
    const pillElementAdm = document.querySelector('#linkAdmin');
    const pillElementRwd = document.querySelector('#linkReward');

    this.jsonNav = JSON.parse(localStorage.currentUser);
    this.navEmp = JSON.stringify(this.jsonNav.role);
    console.log('this navemp:  ' + this.navEmp);

    switch (this.navEmp) {
      case(''):
      pillElementEmp.remove();
      case('"STAFF"'):
      console.log('ag');
      pillElementAdm.remove();
      pillElementFrm.remove();
      pillElementMgr.remove();
      pillElementMrc.remove();
      break;

      case('"SENIOR_MANAGER"'):
      case('"MANAGER"'):
      pillElementAdm.remove();
      pillElementFrm.remove();
      pillElementMrc.remove();
      pillElementRwd.remove();
      break;

      case('"ADMIN"'):
      pillElementMgr.remove();
      pillElementFrm.remove();
      pillElementRwd.remove();
      break;

    }

    switch (window.location.pathname) {
      case ('/manager'):
      pillElementMgr.className = 'nav-link active';
      pillElementMgr.removeAttribute('href');
      break;

      case ('/employee'):
      pillElementEmp.className = 'nav-link active';
      pillElementEmp.removeAttribute('href');
      break;

      case ('/merchant'):
      pillElementMrc.className = 'nav-link active';
      pillElementMrc.removeAttribute('href');
      break;

      case ('/farmer'):
      pillElementFrm.className = 'nav-link active';
      pillElementFrm.removeAttribute('href');
      break;

      case ('/administrator'):
      pillElementAdm.className = 'nav-link active';
      pillElementAdm.removeAttribute('href');
      break;
    }
  }

  goLogout(){
      location.href = '/';
      localStorage.clear(); //ini bisa juga buat hapus semua data di localStorage
  }

  openN(data, content) {
    this.msg = data.detail;
    this.notificationService.updateNotif(data).subscribe(callback => {
      this.allData.emit();
    });
    this.modal.open(content)
  }
}
