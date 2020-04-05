import { Injectable } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ProfileRFDialogBoxComponent } from 'app/pages/profile-rfdialog-box/profile-rfdialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileRfDialogBoxService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'UPDATE',
    btnCancelText: string = 'CANCEL',
    dialogSize: 'sm'|'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(ProfileRFDialogBoxComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
