import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../service/group.service';
import {AwardsService} from "../../../service/awards.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-group-award',
  templateUrl: './group-award.component.html',
  styleUrls: ['./group-award.component.scss']
})
export class GroupAwardComponent implements OnInit {
  @Input('group') group: any;
  awardData = [];
  award: any;
  addAward: FormGroup;
  awardByGroup: any;
  awardId = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private awardService: AwardsService
  ) { }

  ngOnInit() {
    this.addAward = this.formBuilder.group({
      award: ['', Validators.required]
    });
    this.findAllAwardByGroup();
  }

  findAllAward() {
    this.awardData = [];
    this.awardService.findAllAwards().subscribe(callback => {
      let awardData: any = callback;
      for (let award of awardData) {
        if (!this.awardId.includes(award.id)) {
          this.awardData.push(award);
        }
      }
    })
  }

  findAllAwardByGroup () {
    this.awardId = [];
    this.awardByGroup = [];
    this.groupService.findById(this.group.id).subscribe(callback => {
      this.awardByGroup = callback;
      if (this.awardByGroup.group.awards) {
        this.awardByGroup = this.awardByGroup.group.awards;
        for (let award of this.awardByGroup) {
          this.awardId.push(award.id);
        }
        this.findAllAward();
      } else {
        this.awardByGroup = [];
        this.findAllAward();
      }
    });
  }

  open(content) {
    this.modalService.open(content);
  }
  close() {
    this.addAward.reset();
    this.modalService.dismissAll();
  }

  submit () {
    this.awardService.insertAwardIntoGroup(this.group.id, [{id: this.award.id}]).subscribe(callback => {
      this.close();
      this.findAllAwardByGroup();
    });
  }

  removeAwardFromGroup(id) {
    this.awardService.removeAwardFromGroup(this.group.id, {id: id}).subscribe(callback => {
      this.close();
      this.findAllAwardByGroup();
    });
  }
}
