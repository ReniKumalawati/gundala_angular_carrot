import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../../service/transaction.service";
import {EmployeeService} from "../../../service/employee.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-achieved-achievement',
  templateUrl: './achieved-achievement.component.html',
  styleUrls: ['./achieved-achievement.component.scss']
})
export class AchievedAchievementComponent implements OnInit {
  achievements: any;
  employee: any;

  constructor(
    private transactionService: TransactionService,
    private empService: EmployeeService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.findAchievementsThisMonth();
  }

  findAchievementsThisMonth(){
    this.transactionService.getAchievedAchievementThisMonth().subscribe(callback =>{
      this.achievements = callback;
    })
  }

  open(achievement, content){
    let achievementId: any;
    achievementId = achievement.id;

    this.empService.findEmployeeByAchievement(achievementId).subscribe(callback =>{
      let temp: any = callback;
      this.employee = temp.listEmployee;
      console.log(this.employee);
      this.modalService.open(content);
    })
  }
}
