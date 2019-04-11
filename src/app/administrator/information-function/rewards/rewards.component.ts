import { Component, OnInit } from '@angular/core';
import {ItemServiceService} from '../../../service/item-service.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  itemData: any;
  columns = [];
  constructor(
    private itemService: ItemServiceService
  ) { }

  ngOnInit() {
    this.findAllItem()
    this.columns = [
      { prop: 'itemName', name: 'Name', sortable: false, width: 200},
      { prop: 'itemDescription', name: 'Description', sortable: false, width: 200 },
      {prop: 'saleStatus', name: 'Sale Status', sortable: false},
      {prop: 'approvalStatus', name: 'Approval Status', sortable: false},
      {prop: 'exchangeRate', name: 'Exchange Rate', sortable: false, width: 80},
      {prop: 'totalItem', name: 'Total Item', sortable: false, width: 80},
      {prop: 'itemSold', name: 'Item Sold', width: 80}

    ];
  }
  findAllItem() {
    this.itemService.findAllItems().subscribe(callback => {
      this.itemData = callback;
      this.itemData = this.itemData.listItem;
    })
  }
}
