import { Injectable } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ClientAddConfirmationDialogBoxComponent } from 'app/pages/client-add-confirmation-dialog-box/client-add-confirmation-dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class ClientMetConfirmationDialogBoxService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ClientAddConfirmationDialogBoxComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}
