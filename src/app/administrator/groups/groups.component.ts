import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../service/group.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupData: any;
  groupForm: FormGroup;
  groupValue = {name: '', type: '', id: ''}
  constructor(
    private groupService: GroupService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.findAllGroups();
  }

  findAllGroups () {
    this.groupData = [];
    this.groupService.findAllGroup().subscribe(callback => {
      this.groupData = callback;
    })
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.groupForm.reset();
    this.modalService.dismissAll();
  }
  submit () {
      delete this.groupValue;
      this.groupService.insertGroupToDB(this.groupValue).subscribe(callback => {
        this.findAllGroups();
        this.close();
      })
  }
}
