import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RewardsService} from '../service/rewards.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import-reward-section',
  templateUrl: './import-reward-section.component.html',
  styleUrls: ['./import-reward-section.component.scss']
})
export class ImportRewardSectionComponent implements OnInit {
  rewardsData: Object;
  messageForm: FormGroup;
  formReward = {name: '', carrot_amt: 0, active: false}
  constructor(private data: RewardsService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('aaaaa')
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      carrot_amt: ['', Validators.required]
    });
    this.findAllRewards()
  }
  findAllRewards() {
    this.data.findAllRewards().subscribe(callback => {
      this.rewardsData = callback
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.modalService.dismissAll();
  }

  submit () {
    this.data.insertRewardIntoDB(this.formReward).subscribe(callback => {
      console.log(callback)
      this.findAllRewards();
      this.close();
    })
  }

  removeRewardFromDB(id) {
    this.data.deleteRewardFromDB(id).subscribe(callback => {
      this.findAllRewards();
    })
  }

  openEditModal(data, content) {
    this.formReward.name = data.name;
    this.formReward.carrot_amt = data.carrot_amt;
    this.formReward.id = data.id;
    this.open(content)
  }

}
