import { Component, OnInit } from '@angular/core';
import { DesignQuotationServiceService, GetDataResponse, SaveDataResponse } from 'app/Services/design-quotation-service.service';
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

  rooms: Design[];
  mockRooms: Design[]=[
    {item_type:"DESIGN",item_sub_type:"BEDROOM", number:0},
    {item_type:"DESIGN",item_sub_type:"BATHROOM", number:0},
    {item_type:"DESIGN",item_sub_type:"KITCHEN", number:0},
    {item_type:"DESIGN",item_sub_type:"LIVING ROOM", number:0},
  ]

  public countRooms: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  designQuotationRequest: DesignQuotation = {
    design: [],
    view3D: 0,
    adhocCharges: 0,
    clientId: 0
  };

  clientId: Number;

  extraRoom: string = '';
  adhocCharges: number = 0 ;  
  view3D: number = 0;

  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };

  disbalePDF: boolean=true;
  saveDataResponse:SaveDataResponse;

  constructor(private designQuotationService: DesignQuotationServiceService,
     private router: Router,
     private route: ActivatedRoute,
     private toast: MessageService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clientId = params.id;
  })
  this.getData(this.clientId);
  this.adhocCharges= 0 ;  
  this.view3D=0;
  }

  addRoom() {
    if (this.extraRoom.length === 0) {
      this.infoPopUp(this.errorTypes.internalServerError, 'Please Select a Room Name !');
    } else if (this.rooms.filter(obj => obj.item_sub_type === this.extraRoom).length !== 0) {
      this.infoPopUp(this.errorTypes.internalServerError, 'Room Already Exists !');
    } else {
      this.extraRoom=this.extraRoom.toLocaleUpperCase();
      this.rooms.push({item_type:'customRoom', item_sub_type: this.extraRoom, number: 0})
      this.toast.add({severity: 'success', summary: 'Success', detail: 'Room Successfully Added !'});
      this.extraRoom = '';
    }
  }

  save() {
    this.rooms.map(obj => obj.number = Number(obj.number));
    this.designQuotationRequest.design = this.rooms;
    this.designQuotationRequest.view3D = Number(this.view3D);
    this.designQuotationRequest.adhocCharges = this.adhocCharges;
    this.designQuotationRequest.clientId = Number(this.clientId);

    console.log('response', this.designQuotationRequest)
    this.designQuotationService.saveDesignQuotation(this.designQuotationRequest).subscribe(
      response => { this.saveDataResponse = response;
        this.disbalePDF=false;
        this.toast.add({severity: 'success', summary: 'Success', detail: 'Design Quotation Saved !'});
        // this.router.navigate(['/dashboard/profile' + '?id=' + this.clientId])
      },
      error => {
        if (error.error.success == false) {
          this.errorPopUp(this.errorTypes.internalServerError, error.error.msg);
        } else {
          console.log('error', error)
          console.log('error', error.error.errors[0].msg)
          this.errorPopUp(this.errorTypes.internalServerError, error.error.errors[0].msg);
        }
      }
    )
  }

  getData(clientId){
    this.designQuotationService.getData(clientId).subscribe(
      response=>{
        if(response.success){
          this.rooms=response.data.design;
          this.adhocCharges=response.data.adhocCharges;
          this.view3D=response.data.view3D;
          this.disbalePDF=false;
          if(this.rooms.length==0){
            this.disbalePDF=true;
            this.rooms=this.mockRooms;
          }
        }
      }
    )
  }
  generatePDF(){
    this.designQuotationService.generateDNBLPDF(this.clientId).subscribe(
      
    )
  }

  emailPDF(){
    
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

  infoPopUp(type, message) {
    this.toast.add({
      severity: 'info',
      summary: "INFO",
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
}
