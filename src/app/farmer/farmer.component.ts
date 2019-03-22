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
  rootAdminData: Object;
  messageForm: FormGroup;
  barnTemp: Object;
  formBarn = {name: '', owner: '', startPeriod: '', endPeriod: '',
              totalCarrot: '', status: '', released: '', id: ''};
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
  }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
  }

  openEditModal(data, content) {
    this.formBarn.id = data.id;
    this.formBarn.name = data.name;
    this.formBarn.owner = data.owner;
    this.formBarn.startPeriod = data.startPeriod;
    this.formBarn.endPeriod = data.endPeriod;
    this.formBarn.totalCarrot = data.totalCarrot;
    this.formBarn.status = data.status;
    this.formBarn.released = data.released;
    this.open(content);
  }

  submit() {
    if (this.messageForm.invalid) {
      alert('please fulfill the form first');
      return;
    }
    console.log('initial submit:  ' + this.formBarn);
    if (this.formBarn.id != '') {
      delete this.formBarn.id;
      let ownerTmp: any;
      ownerTmp = this.formBarn.owner;
      delete ownerTmp.dob;
      this.formBarn.owner = ownerTmp;
      console.log('formid found submit:  ' + JSON.stringify(this.formBarn));
      this.data.updateBarnInDB(this.formBarn, this.formBarn.id).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllBarns();
        this.close();
      });
    } else {
      delete this.formBarn.id;
      let ownerTmp: any;
      ownerTmp = this.formBarn.owner;
      delete ownerTmp.dob;
      this.formBarn.owner = ownerTmp;
      console.log('formid not found submit:  ' + JSON.stringify(this.formBarn));
      this.data.insertBarnIntoDB(this.formBarn).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllBarns();
        this.close();
      });
    }
  }
}
