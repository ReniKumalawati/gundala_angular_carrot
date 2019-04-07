import { Component, OnInit } from '@angular/core';
import {AwardsService} from '../../service/awards.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import-award-section',
  templateUrl: './import-award-section.component.html',
  styleUrls: ['./import-award-section.component.scss']
})
export class ImportAwardSectionComponent implements OnInit {
  awardsData: Object;
  messageForm: FormGroup;
  formAward = {type_name: '', carrot_amt: 0, active: false, type: ''};
  constructor(private data: AwardsService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      carrot_amt: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.findAllAward();
  }
  findAllAward() {
    this.data.findAllAwards().subscribe(callback => {
      this.awardsData = callback;
      console.log('bbbbbb');
    });
  }
  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.modalService.dismissAll();
  }

  submit() {
    this.data.insertAwardIntoDB(this.formAward).subscribe(callback => {
      this.findAllAward();
      this.close();
    });
  }

  active(award, status) {
    if (status) {
      award.active = true;
    } else {
      award.active = false;
    }

    console.log(award);
    this.data.updateAward(award, award.id).subscribe(callback => {
      this.findAllAward();
      this.close();
    });
  }
}
