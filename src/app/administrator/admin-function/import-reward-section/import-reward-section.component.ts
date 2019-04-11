import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RewardsService} from '../../../service/rewards.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalLoadingComponent} from '../../../partial/modal-loading/modal-loading.component';

@Component({
  selector: 'app-import-reward-section',
  templateUrl: './import-reward-section.component.html',
  styleUrls: ['./import-reward-section.component.scss']
})
export class ImportRewardSectionComponent implements OnInit {
  rewardsData: Object;
  messageForm: FormGroup;
  disableForm: FormGroup;
  submitted = false;
  msg = '';
  dataInactive: any;
  formReward = {title: '', carrot: 0, status: false, description: '', id: ''}
  constructor(private data: RewardsService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      carrot: [0, Validators.min(1)],
      description: ['', Validators.required]
    });
    this.disableForm = this.formBuilder.group({
      msg: ['', Validators.required],
    });
    this.findAllRewards()
  }
  findAllRewards() {
    // this.modalService.open(ModalLoadingComponent)
    this.data.findAllRewards().subscribe(callback => {
      var a = JSON.stringify(callback);
      var b = JSON.parse(a);
      // this.close()
      this.rewardsData = b.listAchievement;
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
    this.formReward.id = undefined;
  }

  submit () {
    this.submitted = true;
    if (this.messageForm.invalid) {
      // alert('please fulfill the form first');
      return;
    }
    this.modalService.open(ModalLoadingComponent);
    console.log(this.formReward.id);
    if (this.formReward.id != undefined && this.formReward.id != ''){
      this.data.updateReward(this.formReward, this.formReward.id).subscribe(callback=> {
        let kembalian = callback;
        this.findAllRewards();
        this.close();
      });
    } else {
      delete this.formReward.id;
      this.data.insertRewardIntoDB(this.formReward).subscribe(callback => {
        console.log(callback)
        this.findAllRewards();
        this.close();
      });
    }
  }

  removeRewardFromDB(id) {
    this.data.deleteRewardFromDB(id).subscribe(callback => {
      this.findAllRewards();
    })
  }

  openEditModal(data, content) {
    this.formReward.id = data.id;
    this.formReward.title = data.title;
    this.formReward.carrot = data.carrot;
    this.formReward.description = data.description;
    this.open(content)
  }

  activate(data) {
    this.modalService.open(ModalLoadingComponent);
    data.status = true;
    let id = data.id;
    delete data.id;
    this.dataInactive.reasoning = '';
    this.data.updateReward(data, id).subscribe(callback => {
      this.close();
      this.findAllRewards()
    })
  }

  inactive(data, content) {
    this.dataInactive = data;
    this.modalService.open(content);
  }

  submitMessage() {
    this.dataInactive.status = false;
    let id = this.dataInactive.id;
    this.dataInactive.reasoning = this.msg;
    delete this.dataInactive.id;
    this.data.updateReward(this.dataInactive, id).subscribe(callback => {
      this.close();
      this.findAllRewards()
    })
  }

}
