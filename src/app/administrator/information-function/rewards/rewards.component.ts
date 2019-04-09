import { Component, OnInit } from '@angular/core';
import {ItemServiceService} from '../../../service/item-service.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  itemData: any;
  constructor(
    private itemService: ItemServiceService
  ) { }

  ngOnInit() {
    this.findAllItem()
  }
  findAllItem() {
    this.itemService.findAllItems().subscribe(callback => {
      this.itemData = callback;
      this.itemData = this.itemData.listItem;
    })
  }
}
