import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-groups-manager',
  templateUrl: './groups-manager.component.html',
  styleUrls: ['./groups-manager.component.scss']
})
export class GroupsManagerComponent implements OnInit {

  groupData: any;
  constructor(
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.findAllGroups();
  }

  findAllGroups () {
    this.groupData = [];
    this.groupService.findAllGroup().subscribe(callback => {
      this.groupData = callback;
    })
  }
}
