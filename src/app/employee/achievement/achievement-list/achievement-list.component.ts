import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {EmployeeService} from '../../../service/employee.service';
import {TransactionService} from '../../../service/transaction.service';

@Component({
  selector: 'app-achievement-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.scss']
})
export class AchievementListComponent implements OnInit {
  employee: any;
  basket: any;
  achievementdata:any = [];
  constructor(
    private auth: AuthenticationService,
    private employeeservice: EmployeeService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.basket = JSON.parse(this.auth.currentBasket());
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
            if (achievement.status === true) {
              achievement.group = g;
              this.achievementdata.push(achievement);
            }
          }
        }
      }
    }
  }

  createTransaction(achievement) {
    console.log(achievement)
    this.employeeservice.findFrezeerByOwner(achievement.group.owner.id).subscribe(callback => {
      let frezeer: any = callback;
      delete frezeer.employee.dob;
      let shareValue = {
        from: frezeer.employee.name,
        to: this.employee.name,
        freezer_from: frezeer,
        detail_to: this.basket,
        carrot_amt: achievement.carrot,
        type: 'REWARD',
        description: achievement.title,
        achievementClaimed: {id: achievement.id}};
      delete shareValue.detail_to.employee.dob
      delete shareValue.detail_to.employee.group
      delete shareValue.freezer_from.created_at
      delete shareValue.freezer_from.updated_at
      delete shareValue.freezer_from.employee.group
      delete shareValue.freezer_from.employee.dob
      console.log(shareValue)
      this.transactionService.insertTansactionToDB(shareValue).subscribe(callback => {
        console.log(callback);
        this.findAchievement();
      });
    })
  }


}
