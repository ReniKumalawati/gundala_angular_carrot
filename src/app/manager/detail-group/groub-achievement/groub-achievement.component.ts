import {Component, Input, OnInit} from '@angular/core';
import {BazarService} from '../../../service/bazar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../service/group.service';
import {RewardsService} from "../../../service/rewards.service";
@Component({
  selector: 'app-groub-achievement',
  templateUrl: './groub-achievement.component.html',
  styleUrls: ['./groub-achievement.component.scss']
})
export class GroubAchievementComponent implements OnInit {
  @Input('group') group: any;
  rewardData = [];
  bazaar: any;
  addAchievement: FormGroup;
  bazaarByGroup: any
  bazarId = [];
  constructor(
    private bazarService : BazarService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private rewardService: RewardsService
  ) { }

  ngOnInit() {
    this.addAchievement = this.formBuilder.group({
      bazaar: ['', Validators.required]
    });
    // this.findAllBazaarByGroup();
  }
  findallReward() {
    this.rewardService.findAllRewards().subscribe(callback => {
      // this.rewardData = callback;
      // let bzTemp: any;
      // bzTemp = callback;
      // for (let bzr of bzTemp) {
      //   if (!this.bazarId.includes(bzr.id)) {
      //     this.bazarData.push(bzr);
      //   }
      // }
    })
  }

  findAllRewardByGroup () {
    // this.bazarId = [];
    // this.groupService.findById(this.group.id).subscribe(callback => {
    //   this.bazaarByGroup = callback;
    //   this.bazaarByGroup = this.bazaarByGroup.bazaars;
    //   for (let bzr of this.bazaarByGroup) {
    //     this.bazarId.push(bzr.id);
    //   }
    //   this.findallBazar();
    // })
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.addAchievement.reset();
    this.modalService.dismissAll();
  }

  submit () {
    this.bazarService.insertGroupIntoBazaar(this.group.id, [{id: this.bazaar.id}]).subscribe(callback => {
      this.close();
      // this.findAllBazaarByGroup();
      // this.findallBazar();
    });
  }

  removeBazaarFromGroup(id) {
    this.bazarService.removeGroupFrpmBazar(this.group.id, {id: id}).subscribe(callback => {
      this.close();
      // this.findAllBazaarByGroup();
      // this.findallBazar();
    });
  }
}
