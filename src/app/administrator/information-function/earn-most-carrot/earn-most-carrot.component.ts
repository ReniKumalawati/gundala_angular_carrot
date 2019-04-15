import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TransactionService} from '../../../service/transaction.service';
import {EmployeeService} from '../../../service/employee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
declare var $;
@Component({
  selector: 'app-earn-most-carrot',
  templateUrl: './earn-most-carrot.component.html',
  styleUrls: ['./earn-most-carrot.component.scss']
})
export class EarnMostCarrotComponent implements OnInit {
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  columns = [];
  employees = [];
  employeeForm: FormGroup;
  employeeValue = { name: '', profilePicture:'', email: '', role: ''};
  constructor(
    private transactionService: TransactionService,
    private empService: EmployeeService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: 'name', name: 'Name', sortable: false},
      { prop: 'carrotEarned', name: 'Total Carrot Earned', width: 100 },
      {prop: 'carrotLeft', name: 'Carrot Left', width: 120},
      {prop: 'donation', name: 'Donation', width: 100},
      {prop: 'shared', name: 'Shared', width: 100},
      {prop: 'reward', name: 'Reward', width: 100},
      {prop: 'carrotThisMonth', name: 'Carrot Earned this Month', width: 120},
      {headerTemplate: this.hdrTpl, name:'Actions', cellTemplate: this.editTmpl, prop: 'employee'}
  ];
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.getEmployeesByCarrotEarned();
  }
  getEmployeesByCarrotEarned() {
    this.employees = []
    this.transactionService.getMostEarner().subscribe(callback => {
      let kembalian:any = callback;
      for (let t of kembalian) {
        let data = {name: t.detail.employee.name, carrotEarned: t.total
          , carrotLeft: t.detail.carrot_amt, employee: t.detail.employee,
          donation: t.donation, shared: t.shared, reward: t.reward, carrotThisMonth: t.carrotThisMonth};
        this.employees.push(data);
        this.employees = [...this.employees]
      }
    });
  }

  open(content, data) {
    this.empService.findEmployeeById(data.id).subscribe(callback => {
      let empTemp: any = callback;
      this.employeeValue.profilePicture = empTemp.employee.profilePicture;
      this.employeeValue.name = empTemp.employee.name;
      this.employeeValue.email = empTemp.employee.emailAddress;
      this.employeeValue.role = empTemp.employee.role;
      this.modalService.open(content);
    });
  }
}
