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
  singleItem: any;
  itemValue = {id: '', itemName: '', itemDescription: '', exchangeRate: 0, totalItem: 0, approvalStatus: false, saleStatus: false, itemSold: 0, bazaar: {id: ''}};
  private id: string;
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
      itemName: ['', Validators.required],
      itemDescription: ['', Validators.required],
      exchangeRate: ['', Validators.required],
      totalItem: ['', Validators.required],
      approvalStatus: [''],
      saleStatus: ['']
    });
    this.param = this.route.params;
    this.bazarForm = this.formBuilder.group({
      bazaarName: ['', Validators.required],
      status: [''],
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      owner: ['', Validators.required],
      bazaarDescription: ['', Validators.required]
    });
    this.findAllEmployeeByRole();
    if (this.param.value.id != null) {
      this.findBazaarById(this.param.value.id);
      this.findAllItemByBazarId(this.param.value.id);
      this.itemValue.bazaar.id = this.param.value.id;
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
      if (this.baz.owner != null) {
        this.formBaxar.owner.id = this.baz.owner.id;
      }
      this.formBaxar.bazaarDescription = this.baz.bazaarDescription;
      this.formBaxar.startPeriod = this.baz.startPeriod;
      this.formBaxar.endPeriod = '2019-04-14';
      this.formBaxar.status = this.baz.status;
    })
  }

  onSubmit() {
    if (this.param.value.id != null) {
      this.bazarService.updateBazarById(this.param.value.id, this.formBaxar).subscribe(callback => {
        location.href = '/merchant';
      })
    } else {
      this.bazarService.insertIntoDB(this.formBaxar).subscribe(callback => {
        console.log(callback)
      })
    }
  }

  deleteItemFromBazarById(id) {
    this.itemService.deleteItemById(id).subscribe(callback => {
      this.findAllItemByBazarId(this.param.value.id);
    })
  }

  submit () {
    if (this.itemValue.id != '') {
      this.id = this.itemValue.id;
      delete this.itemValue.id;
      this.itemService.updateItemById(this.id, this.itemValue).subscribe(callback => {
        this.id = '';
        this.findAllItemByBazarId(this.param.value.id);
        this.close();
      })
    } else{
      delete this.itemValue.id;
      this.itemService.insertItemIntoDB(this.itemValue).subscribe(cllback => {
        this.findAllItemByBazarId(this.param.value.id);
        this.close();
      });
    }
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.itemForm.reset();
    this.bazarForm.reset();
    this.modalService.dismissAll();
  }

  editItem(id, content) {
    this.itemService.findItemById(id).subscribe(callback => {
      this.singleItem = callback;
      this.itemValue.id = this.singleItem.id;
      this.itemValue.itemName = this.singleItem.itemName;
      this.itemValue.itemDescription = this.singleItem.itemDescription;
      this.itemValue.exchangeRate = this.singleItem.exchangeRate;
      this.itemValue.totalItem = this.singleItem.totalItem;
      this.itemValue.approvalStatus = this.singleItem.approvalStatus;
      this.itemValue.saleStatus = this.singleItem.saleStatus;
      this.itemValue.itemSold = this.singleItem.itemSold;
      this.open(content)
    })
  }
}
