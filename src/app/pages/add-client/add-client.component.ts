import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddClientServiceService, ClientDetails } from 'app/Services/add-client-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers: [MessageService]
})
export class AddClientComponent implements OnInit {

  clientDetails: ClientDetails;
  status: string;
  hasError: Boolean = false;
  errorMsg: any;
  scopeOfWork;
  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };

  firstName;
  lastName;
  contact;
  email;
  visitCharges;
  address;
  scopeAndRemarks;
  shareReqForm;

  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>()
  meetingDatetime: Date;
  meetingDatetimeString: string;

  constructor(private addClientServiceService: AddClientServiceService,
    private router: Router,
    private toast: MessageService) { }

  ngOnInit() {
  }
  submitAddClientForm(form: NgForm) {
    let shareReqFormValue = 0;
    if (form.value.shareReqForm) {
      shareReqFormValue = 1;
    }

    this.meetingDatetime = form.value.meetingDatetime;
    this.meetingDatetimeString = this.meetingDatetime.toISOString().slice(0, 11).replace('T', ' ') + this.meetingDatetime.toLocaleTimeString()
    console.log(form.value.meetingDatetime)
    console.log(this.meetingDatetimeString)
    this.clientDetails = {
                          title: form.value.title,
                          firstName: form.value.firstName,
                          lastName: form.value.lastName,
                          email: form.value.email,
                          mobile: form.value.contact,
                          address: form.value.address,
                          city: form.value.city,
                          meetingDatetime: this.meetingDatetimeString,
                          shareReqForm: shareReqFormValue,
                          visitCharges: form.value.visitCharges,
                          package: form.value.package,
                          scopeOfWork: form.value.scopeOfWork
                        };

    this.addClientServiceService.saveAddClientBasicDetails(this.clientDetails).subscribe(
      responseStatus => {
        if (responseStatus.success) {
          this.toast.add({severity: 'success', summary: 'Success', detail: 'Client Successfully Added'});
          this.emitFunctionOfParent.emit();
          form.reset();
        }
      }, error => {
        if (error.error.success == false) {
          this.errorPopUp(this.errorTypes.internalServerError, error.error.msg);
        } else {
          console.log('error', error)
          console.log('error', error.error.errors[0].msg)
          this.errorPopUp(this.errorTypes.internalServerError, error.error.errors[0].msg);
        }
      })
  }

  errorPopUp(type, message) {
    this.toast.add({
      severity: 'error',
      summary: type,
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
}
