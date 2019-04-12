import {Component, Input, OnInit} from '@angular/core';
import {BazarService} from '../../../service/bazar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../service/group.service';
import {AchievementService} from '../../../service/achievement.service';
@Component({
  selector: 'app-groub-achievement',
  templateUrl: './groub-achievement.component.html',
  styleUrls: ['./groub-achievement.component.scss']
})
export class GroubAchievementComponent implements OnInit {
  @Input('group') group: any;
  achievementData = [];
  achievement: any;
  addAchievement: FormGroup;
  achievementByGroup: any;
  achievementId = [];
  constructor(
    private bazarService : BazarService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private achievementService: AchievementService
  ) { }

  ngOnInit() {
    this.addAchievement = this.formBuilder.group({
      achievement: ['', Validators.required]
    });
    this.findAllAchievementByGroup();
  }
  findallAchievement() {
    this.achievementData = [];
    this.achievementService.findAllAchievement().subscribe(callback => {
      let achievementData: any = callback;
      for (let ach of achievementData.listAchievement) {
        if (!this.achievementId.includes(ach.id)) {
          this.achievementData.push(ach);
        }
      }
    })
  }

  findAllAchievementByGroup () {
    this.achievementId = [];
    this.achievementByGroup = []
    this.groupService.findById(this.group.id).subscribe(callback => {
      this.achievementByGroup = callback;
      if (this.achievementByGroup.group.achievements) {
        this.achievementByGroup = this.achievementByGroup.group.achievements;
        for (let achievement of this.achievementByGroup) {
          this.achievementId.push(achievement.id);
        }
        this.findallAchievement();
      } else {
        this.achievementByGroup = [];
        this.findallAchievement();
      }
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.addAchievement.reset();
    this.modalService.dismissAll();
  }

  submit () {
    this.achievementService.insertAchievementIntoGroup(this.group.id, [{id: this.achievement.id}]).subscribe(callback => {
      this.close();
      this.findAllAchievementByGroup();
    });
  }

  removeAchievementFromGroup(id) {
    this.achievementService.removeAchievementFromGroup(this.group.id, {id: id}).subscribe(callback => {
      this.close();
      this.findAllAchievementByGroup();
    });
  }
}
