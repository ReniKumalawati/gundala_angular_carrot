import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent implements OnInit {
  employee: any;
  achievementdata:any = [];
  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.findAchievement()
  }

  findAchievement() {
    this.achievementdata = [];
    const group = this.employee.group;
    if (group) {
      for (let g of group) {
        console.log(g)
        if (g.achievements) {
          for (let achievement of g.achievements) {
            this.achievementdata.push(achievement)
          }
        }
      }
    }
  }

  createTransaction() {
    console.log(this.employee.group)
    // let shareValue = {from: this.employee.name,
    //   to: 'REWARD',
    //   detail_from: this.basket,
    //   carrot_amt: this.item.exchangeRate,
    //   type: 'BAZAAR',
    //   description: 'Buy an Item in ' + this.item.bazaar.bazaarName,
    //   requested_item: this.item};
    // delete shareValue.detail_from.employee.dob
    // this.transactionService.insertTansactionToDB(shareValue).subscribe(callback => {
    //   console.log(callback);
    //   this.findBasketByEmployeeId();
    // });
  }

}
