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
  adminData: Object;
  messageForm: FormGroup;
  formBarn = {name: '', owner: '', startPeriod: '', endPeriod: '',
              totalCarrot: '', carrotLeft: '', status: '',
              released: '', awards: '', id: ''};
  constructor(
    private data: FarmService,
    private profile: ProfileService,
    private emp: EmployeeService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.findAllBarns();
    this.findAllEmployeeByRole();
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      totalCarrot: ['', Validators.required],
      carrotLeft: [''],
      status: ['', Validators.required],
      released: ['', Validators.required],
      awards: [''],
    });
  }

  findAllBarns() {
    this.data.findAllBarns().subscribe(callback => {
      this.barnData = callback;
    });
  }

  findAllEmployeeByRole() {
    this.emp.findEmployeeByRole('ADMIN').subscribe(callback => {
      this.adminData = callback;
    })
  }

  findAllEmployee(){
    this.profile.findAllEmployee().subscribe(callback => {
      console.log(callback);
      this.employeeData = callback;
    });
  }

  removeBarn(id){
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
    this.modalService.open(content);
  }

  close() {
    this.messageForm.reset();
    this.modalService.dismissAll();
  }

  openEditModal(data, content) {
    this.formBarn.name = data.name;
    this.formBarn.owner = data.owner;
    this.formBarn.startPeriod = data.startPeriod;
    this.formBarn.endPeriod = data.endPeriod;
    this.formBarn.totalCarrot = data.totalCarrot;
    this.formBarn.status = data.status;
    this.formBarn.released = data.released;
    this.formBarn.awards = data.awards;
    this.open(content);
  }

  submit() {
    if (this.messageForm.invalid) {
      alert('please fulfill the form first');
      return;
    }
    if (this.formBarn.id != '') {
      let id: any;
      id = this.formBarn.id;
      delete this.formBarn.id;
      this.data.updateBarnInDB(this.formBarn, id).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllBarns();
        this.close();
      });
    } else {
      delete this.formBarn.id;
      this.data.insertBarnIntoDB(this.formBarn).subscribe(callback => {
        let kembalian: any;
        kembalian = callback;
        this.findAllBarns();
        this.close();
      });
    }
  }
}
