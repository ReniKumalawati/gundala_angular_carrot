import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FarmService } from '../service/farm.service';
import { ProfileService } from '../service/profile.service';
import { EmployeeService } from '../service/employee.service';



@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit {
  barnData: Object;
  employeeData: Object;
  rootAdminData: any;
  messageForm: FormGroup;
  barnTemp: Object;
  formBarn = {name: '', owner: '', startPeriod: '', endPeriod: '',
              totalCarrot: '', status: '', released: ''};
  constructor(
    private data: FarmService,
    private profile: ProfileService,
    private emp: EmployeeService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      totalCarrot: ['', Validators.required],
      status: ['', Validators.required],
      released: ['', Validators.required],
      awards: [''],
    });
    this.findAllBarns();
    this.findAllEmployeeByRole();
  }

  findAllBarns() {
    this.data.findAllBarns().subscribe(callback => {
      this.barnData = callback;
    });
  }

  findAllEmployeeByRole() {
    this.emp.findEmployeeByRole('ROOT_ADMIN').subscribe(callback => {
      this.rootAdminData = callback;
      this.rootAdminData = this.rootAdminData.listEmployee
    });
  }

  findAllEmployee() {
    this.profile.findAllEmployee().subscribe(callback => {
      console.log(callback);
      this.employeeData = callback;
    });
  }

  removeBarn(id){
    console.log('id' + id);
    this.data.deleteBarnInDB(id).subscribe();
    this.findAllBarns();
  }

  active(barn, status) {
    if (status) {
      barn.status = true;
    } else {
      barn.status = false;
    }

    // console.log(barn);
    this.data.updateBarnInDB(barn, barn.id).subscribe(callback => {
      this.findAllBarns();
      this.close();
    });
  }

  release(barn, status) {
    if (status) {
      barn.released = true;
    } else {
      barn.released = false;
    }

    // console.log(barn);
    this.data.updateBarnInDB(barn, barn.id).subscribe(callback => {
      this.findAllBarns();
      this.close();
    });
  }

  open(content) {
    this.messageForm.reset();
    this.modalService.open(content);
    console.log('open content, id =  ' + this.barnTemp);
  }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
    this.barnTemp = undefined;
  }

  openEditModal(data, content) {
    this.barnTemp = data.id;
    this.formBarn.name = data.name;
    this.formBarn.owner = data.owner;
    this.formBarn.startPeriod = data.startPeriod;
    this.formBarn.endPeriod = data.endPeriod;
    this.formBarn.totalCarrot = data.totalCarrot;
    this.formBarn.status = data.status;
    this.formBarn.released = data.released;
    console.log('open edit modal, id =  ' + this.barnTemp);
    this.open(content);
  }

  submit() {
    if (this.messageForm.invalid) {
      alert('please fulfill the form first');
      return;
    }
    console.log('initial submit:  ' + JSON.stringify(this.formBarn));
    if (this.barnTemp != undefined) {
      let ownerTmp: any;
      ownerTmp = this.formBarn.owner;
      delete ownerTmp.dob;
      this.formBarn.owner = ownerTmp;
      console.log('formid found submit to update:  ' + JSON.stringify(this.formBarn));
      this.data.updateBarnInDB(this.formBarn, this.barnTemp).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        console.log (kembalian)
        this.findAllBarns();
        this.close();
      });
    } else {
      delete this.barnTemp;
      let ownerTmp: any;
      ownerTmp = this.formBarn.owner;
      delete ownerTmp.dob;
      this.formBarn.owner = ownerTmp;
      console.log('formid not found submit to postnew:  ' + JSON.stringify(this.formBarn));
      this.data.insertBarnIntoDB(this.formBarn).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllBarns();
        this.close();
      });
    }
  }
}
