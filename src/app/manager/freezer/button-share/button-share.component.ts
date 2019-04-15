import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication.service';
import {EmployeeService} from '../../../service/employee.service';
import {GroupService} from '../../../service/group.service';
import {AchievementService} from '../../../service/achievement.service';
import {TransactionService} from '../../../service/transaction.service';
import {ModalLoadingComponent} from '../../../partial/modal-loading/modal-loading.component';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-button-share',
  templateUrl: './button-share.component.html',
  styleUrls: ['./button-share.component.scss']
})
export class ButtonShareComponent implements OnInit {
  @Input('barn') barn:any;
  @Output() allData: EventEmitter<any> = new EventEmitter();
  achievementData: any;
  freezer: any;
  employee:any;
  rewardEmployee: FormGroup;
  employeeData: any;
  timestamp = new Date().getTime();
  request: FormGroup;
  reward:any = {employee: {}, achievementClaimed: {}, carrot_amt: 0, description: '', type: 'REWARD'}
  requestValue:any = {carrot_amt: 0, description: ''}
  btnReqSubmit = false;
  btnRewardSubmit = false;
  submitted = false;
  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private employeeService: EmployeeService,
    private groupService: GroupService,
    private achievementService: AchievementService,
    private transactionService: TransactionService,
    private notif: NotificationsService
  ) { }

  ngOnInit() {
    this.rewardEmployee = this.formBuilder.group({
      employee: ['', Validators.required],
      reward: ['', Validators.required],
      carrot: ['', Validators.required],
      description: [0, Validators.required]
    });

    this.request = this.formBuilder.group({
      carrot: ['', Validators.required],
      description: [0, Validators.required]
    });
    this.employee = JSON.parse(this.auth.currentEmployee())
    this.freezer = JSON.parse(this.auth.currentFreezer())
    this.findGroupAndMember()
    this.findAllAchievement()
  }

  findGroupAndMember() {
    this.groupService.findGroupIdByOwner(this.employee.id).subscribe(callback => {
      let group:any= callback
      let data = []
      if (group != undefined && group != null) {
        for (let g of group) {
          data.push({id: g.id})
        }
        this.findAllMember(data)
      }
    })
  }

  findAllMember (data) {
    this.employeeService.findAllMemberOfMultipleGroup(data).subscribe(callback => {
      this.employeeData = callback;
      this.employeeData = this.employeeData.listEmployee;
    })
  }

  findAllAchievement() {
    this.achievementService.findAllAchievement().subscribe(callback => {
      this.achievementData = callback;
      this.achievementData = this.achievementData.listAchievement
    })
  }

  close() {
    this.modal.dismissAll();
  }
  open (content) {
    this.modal.open(content)
  }
  submit() {
    this.submitted = true;
    if (this.rewardEmployee.invalid) {
      return;
    }
    this.btnRewardSubmit = true;
    this.modal.open(ModalLoadingComponent)
    this.employeeService.findBasketByEmployeeId(this.reward.employee.id).subscribe(callback => {
      this.reward.from = this.employee.name
      this.reward.to = this.reward.employee.name
      this.reward.freezer_from = this.freezer
      this.reward.detail_to = callback
      delete this.reward.employee
      delete this.reward.detail_to.employee.group
      delete this.reward.detail_to.employee.dob
      this.transactionService.insertTansactionToDB(this.reward).subscribe(callback => {
        let trs: any = callback;
        this.transactionService.approve(trs.transaction.id).subscribe(callback1 => {
          let hasil: any = callback1
          this.close();
          this.btnRewardSubmit = false;
          this.allData.emit();
          if (hasil.status) {
            this.notif.success('Reward', 'Reward Successfully sent to employee');
          } else {
            this.notif.error('Reward', hasil.message);
          }
        })
      })
    })
  }

  submitReq() {
    this.btnReqSubmit = true;
    this.modal.open(ModalLoadingComponent);
    this.requestValue.freezer_to = this.freezer
    this.requestValue.barn = this.barn
    this.requestValue.type= 'REQUEST'
    this.requestValue.from = this.barn.owner.name
    this.requestValue.to = this.employee.name
    delete this.requestValue.barn.owner.dob
    delete this.requestValue.barn.owner.group
    delete this.requestValue.freezer_to.employee.dob
    delete this.requestValue.freezer_to.employee.group
    this.transactionService.insertTansactionToDB(this.requestValue).subscribe(callback => {
      let hasil: any = callback
      this.btnReqSubmit = false;
      this.close();
      this.requestValue.carrot_amt = 0;
      this.requestValue.description = '';
      this.allData.emit();
      if (hasil.status) {
        this.notif.success('Reward', 'Reward Successfully sent to employee');
      } else {
        this.notif.error('Reward', hasil.message);
      }
    });
  }
  change() {
    this.reward.carrot_amt = this.reward.achievementClaimed.carrot
  }
}
