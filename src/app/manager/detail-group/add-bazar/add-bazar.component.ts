import {Component, Input, OnInit} from '@angular/core';
import {BazarService} from '../../../service/bazar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../service/group.service';
@Component({
  selector: 'app-add-bazar',
  templateUrl: './add-bazar.component.html',
  styleUrls: ['./add-bazar.component.scss']
})
export class AddBazarComponent implements OnInit {
  @Input('group') group: any;
  bazarData = [];
  bazaar: any;
  addBazaar: FormGroup;
  bazaarByGroup: any
  bazarId = [];
  constructor(
    private bazarService : BazarService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    ) { }

  ngOnInit() {
    this.addBazaar = this.formBuilder.group({
      bazaar: ['', Validators.required]
    });
    this.findAllBazaarByGroup();
  }
   findallBazar() {
    console.log('gel all data')
     this.bazarService.findAllBazars().subscribe(callback => {
       let bzTemp: any;
       bzTemp = callback;
       for (let bzr of bzTemp) {
         if (!this.bazarId.includes(bzr.id)) {
           this.bazarData.push(bzr);
         }
       }
     })
   }

   findAllBazaarByGroup () {
    this.bazarId = [];
    this.groupService.findById(this.group.id).subscribe(callback => {
      this.bazaarByGroup = callback;
      this.bazaarByGroup = this.bazaarByGroup.bazaars;
      if (this.bazaarByGroup) {
        for (let bzr of this.bazaarByGroup) {
          this.bazarId.push(bzr.id);
        }
        this.findallBazar();
      } else {
        this.findallBazar();
      }
    })
   }

  open(content) {
    this.modalService.open(content);
  }

  close() {
    this.addBazaar.reset();
    this.modalService.dismissAll();
  }

  submit () {
    this.bazarService.insertGroupIntoBazaar(this.group.id, [{id: this.bazaar.id}]).subscribe(callback => {
      this.close();
      this.findAllBazaarByGroup();
      this.findallBazar();
    });
  }

  removeBazaarFromGroup(id) {
    this.bazarService.removeGroupFrpmBazar(this.group.id, {id: id}).subscribe(callback => {
      this.close();
      this.findAllBazaarByGroup();
      this.findallBazar();
    });
  }
}
