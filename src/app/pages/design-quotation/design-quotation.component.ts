import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DesignQuotationServiceService, DesignQuotationResponse } from 'app/Services/design-quotation-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import { Design } from 'app/Models/Design';
import { DesignQuotation } from 'app/Models/DesignQuotation';

@Component({
  selector: 'app-design-quotation',
  templateUrl: './design-quotation.component.html',
  styleUrls: ['./design-quotation.component.scss'],
  providers: [MessageService]
})
export class DesignQuotationComponent implements OnInit {

  design: Design[] = [
    {roomName: 'BEDROOM', roomType: 'bedRoom', count: 0},
    {roomName: 'BATHROOM', roomType: 'kitchen', count: 0},
    {roomName: 'KITCHEN', roomType: 'bathRoom', count: 0},
    {roomName: 'LIVING ROOM', roomType: 'livingRoom', count: 0}
  ];

  public countRooms: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  errorMsg: string;
  status: string;

  designQuotation: DesignQuotation = {
    design: [],
    view3D: 0,
    adhocCharges: 0,
    clientId: 0
  };

  clientId: Number;
  designQuotationResponse: DesignQuotationResponse
  url: String;
  extraRoom: String = '';
  adhocCharges: Number;
  view3D: Number = 0;
  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };
  constructor(private designQuotationService: DesignQuotationServiceService,
     private router: Router,
     private route: ActivatedRoute,
     private toast: MessageService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clientId = params.id;
  })
  }

  addRoom() {
    if (this.extraRoom.length === 0) {
      this.errorPopUp(this.errorTypes.internalServerError, 'Please Select a Room Name !');
    } else if (this.design.filter(obj => obj.roomName === this.extraRoom).length !== 0) {
      this.errorPopUp(this.errorTypes.internalServerError, 'Room Already Exists !');
    } else {
      this.design.push({roomName: this.extraRoom, roomType: 'customRoom', count: 0})
      this.toast.add({severity: 'success', summary: 'Success', detail: 'Room Successfully Added !'});
      this.extraRoom = '';
    }
  }

  submitDesignQuotationForm(form: NgForm) {

    this.design.map(obj => obj.count = Number(obj.count));
    this.designQuotation.design = this.design;
    this.designQuotation.view3D = Number(this.view3D);
    this.designQuotation.adhocCharges = this.adhocCharges;
    this.designQuotation.clientId = Number(this.clientId);

    console.log('response', this.designQuotation)
    this.designQuotationService.generateDesignQuotationForm(this.designQuotation).subscribe(
      response => { this.designQuotationResponse = response;
        this.toast.add({severity: 'success', summary: 'Success', detail: 'Design Quotation Generated !'});
        this.router.navigate(['/dashboard/profile' + '?id=' + this.clientId])
      },
      error => {
        if (error.error.success == false) {
          this.errorPopUp(this.errorTypes.internalServerError, error.error.msg);
          // this.router.navigate(['/dashboard/designerClientMet'])
        } else {
          console.log('error', error)
          console.log('error', error.error.errors[0].msg)
          this.errorPopUp(this.errorTypes.internalServerError, error.error.errors[0].msg);
        }
      }
    )
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
