import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientMetConfirmationDialogBoxService } from 'app/Services/client-met-confirmation-dialog-box.service';

@Component({
  selector: 'app-client-add-confirmation-dialog-box',
  templateUrl: './client-add-confirmation-dialog-box.component.html',
  styleUrls: ['./client-add-confirmation-dialog-box.component.scss']
})
export class ClientAddConfirmationDialogBoxComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal, private confirmationBoxService: ClientMetConfirmationDialogBoxService) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept(mom) {
    this.confirmationBoxService.setMOM(mom);
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
