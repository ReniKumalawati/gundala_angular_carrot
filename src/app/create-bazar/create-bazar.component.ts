import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {BazarService} from '../service/bazar.service';
import { ActivatedRoute } from '@angular/router';
import {ItemServiceService} from '../service/item-service.service';
import {calcBindingFlags} from '@angular/core/src/view/util';
import {callbackify} from 'util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-bazar',
  templateUrl: './create-bazar.component.html',
  styleUrls: ['./create-bazar.component.scss']
})
export class CreateBazarComponent implements OnInit {
  bazarItem: Object;
  bazarForm: FormGroup;
  adminData: Object;
  formBaxar = {bazaarName: '', startPeriod: '', endPeriod: '', status: false, bazaarDescription: '', owner: {id: ''}}
  param: any;
  baz: any;
  itemForm: FormGroup;
  itemValue = {name: '', carrot_amt: 0};
  constructor(
    private formBuilder: FormBuilder,
    private emp: EmployeeService,
    private bazarService: BazarService,
    private route: ActivatedRoute,
    private itemService: ItemServiceService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      carrot_amt: ['', Validators.required]
    });
    this.param = this.route.params;
    this.bazarForm = this.formBuilder.group({
      bazaarName: ['', Validators.required],
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      owner: ['', Validators.required],
      bazaarDescription: ['', Validators.required]
    });
    this.findAllEmployeeByRole();
    if (this.param.value.id != null) {
      this.findBazaarById(this.param.value.id);
      this.findAllItemByBazarId(this.param.value.id);
    }
  }

  findAllEmployeeByRole() {
    this.emp.findEmployeeByRole('ADMIN').subscribe(callback => {
      this.adminData = callback
    })
  }

  findAllItemByBazarId(id) {
    this.bazarItem = [];
    this.itemService.findItemByBazarId(id).subscribe(callback => {
      this.bazarItem = callback;
    })
  }

  findBazaarById(id) {
    this.bazarService.findBazarById(id).subscribe(callback => {
      this.baz = callback;
      this.formBaxar.bazaarName = this.baz.bazaarName;
      this.formBaxar.owner.id = this.baz.owner.id;
      this.formBaxar.bazaarDescription = this.baz.bazaarDescription;
      this.formBaxar.startPeriod = this.baz.startPeriod;
      this.formBaxar.endPeriod = '2019-04-14';
      this.formBaxar.status = this.baz.status;
    })
  }

  onSubmit() {
    this.bazarService.insertIntoDB(this.formBaxar).subscribe(callback => {
      console.log(callback)
    })
  }

  deleteItemFromBazarById(id) {
    this.itemService.deleteItemById(id).subscribe(callback => {
      this.findAllItemByBazarId(this.param.value.id);
    })
  }

  submit () {
    console.log("kkkkk");
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.modalService.dismissAll();
  }
}
