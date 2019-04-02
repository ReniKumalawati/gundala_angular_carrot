import {Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.scss']
})
export class ModalLoadingComponent implements OnInit {
  @Input('load') load: any;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}
