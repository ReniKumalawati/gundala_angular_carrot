import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../../service/transaction.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-achieved-achievement',
  templateUrl: './achieved-achievement.component.html',
  styleUrls: ['./achieved-achievement.component.scss']
})
export class AchievedAchievementComponent implements OnInit {
  achievements: any;

  constructor(
    private transactionService: TransactionService,
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

}
