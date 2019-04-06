import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-achieved',
  templateUrl: './achieved.component.html',
  styleUrls: ['./achieved.component.scss']
})
export class AchievedComponent implements OnInit {
  employee: any;
  achievementdata:any = [];
  constructor(private auth: AuthenticationService,
              private employeeservice: EmployeeService,) { }

  ngOnInit() {
    this.employee = JSON.parse(this.auth.currentEmployee());
    this.findAchievementByEmployee()
  }

  findAchievementByEmployee() {
    this.achievementdata = [];
    this.employeeservice.findAchievementbyEmployee(this.employee.id).subscribe(callback => {
      this.achievementdata = callback;
      this.achievementdata = this.achievementdata.listAchievement
    })
  }
}
