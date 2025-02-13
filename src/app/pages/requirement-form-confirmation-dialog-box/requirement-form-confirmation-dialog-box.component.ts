import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requirement-form-confirmation-dialog-box',
  templateUrl: './requirement-form-confirmation-dialog-box.component.html',
  styleUrls: ['./requirement-form-confirmation-dialog-box.component.scss']
})
export class RequirementFormConfirmationDialogBoxComponent implements OnInit {


  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
