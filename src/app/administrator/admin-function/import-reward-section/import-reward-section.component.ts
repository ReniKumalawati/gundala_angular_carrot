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
  formReward = {title: '', carrot: 0, status: false, description: ''}
  constructor(private data: RewardsService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      carrot: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.findAllRewards()
  }
  findAllRewards() {
    // this.modalService.open(ModalLoadingComponent)
    this.data.findAllRewards().subscribe(callback => {
      // this.close()
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
    this.modalService.open(ModalLoadingComponent)
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
    this.formReward.title = data.title;
    this.formReward.carrot = data.carrot;
    this.formReward.description = data.description;
    this.open(content)
  }

  activate(data) {
    this.modalService.open(ModalLoadingComponent)
    data.status = true
    let id = data.id
    delete data.id
    this.data.updateReward(data, id).subscribe(callback => {
      this.close()
      this.findAllRewards()
    })
  }

  inactive(data) {
    this.modalService.open(ModalLoadingComponent)
    data.status = false
    let id = data.id
    delete data.id
    this.data.updateReward(data, id).subscribe(callback => {
      this.close()
      this.findAllRewards()
    })
  }

}
