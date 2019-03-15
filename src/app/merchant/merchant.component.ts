import { Component, OnInit } from '@angular/core';
import {BazarService} from '../service/bazar.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  bazarData: Object;
  constructor(private bazarService : BazarService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.bazarService.findAllBazars().subscribe(callback => {
      this.bazarData = callback;
    })
  }

}
