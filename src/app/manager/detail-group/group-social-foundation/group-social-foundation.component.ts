import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BazarService} from '../../../service/bazar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupService} from '../../../service/group.service';
import {SocialFoundationService} from '../../../service/social-foundation.service';

@Component({
  selector: 'app-group-social-foundation',
  templateUrl: './group-social-foundation.component.html',
  styleUrls: ['./group-social-foundation.component.scss']
})
export class GroupSocialFoundationComponent implements OnInit {
  @Input('group') group: any;
  socialFoundationData = [];
  socialFoundation: any;
  addSocialFoundation: FormGroup;
  socialFoundationByGroup: any;
  socialFoundationId = [];
  constructor(
    private socialFoundationService : SocialFoundationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.addSocialFoundation = this.formBuilder.group({
      bazaar: ['', Validators.required]
    });
    this.findAllSocialFoundationByGroup();
  }
  findallSocialFoundation() {
    this.socialFoundationData = [];
    this.socialFoundationService.findAllSocialFoundation().subscribe(callback => {
      let bzTemp: any;
      bzTemp = callback;
      if (bzTemp.listSocialFoundation) {
        for (let bzr of bzTemp.listSocialFoundation) {
          if (!this.socialFoundationId.includes(bzr.id) && bzr.status === true) {
            this.socialFoundationData.push(bzr);
          }
        }
      }
    })
  }
  isRealValue(obj)
  {
    return obj && obj !== 'null' && obj !== 'undefined';
  }

  findAllSocialFoundationByGroup () {
    this.socialFoundationId = [];
    this.groupService.findById(this.group.id).subscribe(callback => {
      this.socialFoundationByGroup = callback;
      if (this.isRealValue(this.socialFoundationByGroup.group.socialFoundations)) {
        this.socialFoundationByGroup = this.socialFoundationByGroup.group.socialFoundations;
        console.log(this.socialFoundationByGroup)
        for (let bzr of this.socialFoundationByGroup) {
          this.socialFoundationId.push(bzr.id);
        }
        this.findallSocialFoundation();
      } else {
        this.socialFoundationByGroup = [];
        this.findallSocialFoundation();
      }
    })
  }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.addSocialFoundation.reset();
    this.modalService.dismissAll();
  }

  submit () {
    this.socialFoundationService.insertSocialFoundationIntoGroup(this.group.id, [{id: this.socialFoundation.id}]).subscribe(callback => {
      this.close();
      this.findAllSocialFoundationByGroup();
    });
  }

  removeSocialFoundationFromGroup(id) {
    this.socialFoundationService.removeSocialFoundationIntoGroup(this.group.id, {id: id}).subscribe(callback => {
      this.close();
      this.findAllSocialFoundationByGroup();
    });
  }

}
