import { Component, OnInit } from '@angular/core';
import { FarmService} from "../service/farm.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  barnData: any;
  constructor(
    private farmService : FarmService
  ) { }

  ngOnInit() {
    this.findAllBarns();
  }

  findAllBarns(){
    this.farmService.findAllBarns().subscribe(callback =>{
      this.barnData = callback;
    })
  }
}
