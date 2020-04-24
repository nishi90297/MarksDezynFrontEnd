import { Component, OnInit, Input } from '@angular/core';
import {DesignerAssignedClient} from '../../Models/DesignerAssignedClient';
import {DesignerAssignedClientsServiceService, ClientMetDetails} from '../../Services/designer-assigned-clients-service.service';
import { ClientAddConfirmationDialogBoxComponent } from '../client-add-confirmation-dialog-box/client-add-confirmation-dialog-box.component';
import { ClientMetConfirmationDialogBoxService } from 'app/Services/client-met-confirmation-dialog-box.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-designer-meetings',
  templateUrl: './designer-meetings.component.html',
  styleUrls: ['./designer-meetings.component.scss'],
  providers: [MessageService]
})
export class DesignerMeetingsComponent implements OnInit {

  fetchedAssignedClients: DesignerAssignedClient[] = [];
  clientMetDetails: ClientMetDetails ={
    clientId:0,
    projectId:0,
    mom:"",
  };  
  displayDialog: boolean;
  minutesOfMeeting:String;

  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };
  constructor(
    private designerAssignedClientService: DesignerAssignedClientsServiceService,
    private confirmationBoxService:ClientMetConfirmationDialogBoxService,
    private toast: MessageService
  ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this.designerAssignedClientService.getClients().subscribe(
      response => {
        console.log('designerAssignedClientService-->', response)
        if(response.success){
          this.fetchedAssignedClients = response.data.allClients
        }
      }
    )
  }

  save() {
    this.clientMetDetails.mom=this.minutesOfMeeting;
    this.designerAssignedClientService.updateClientMet(this.clientMetDetails)
    .subscribe(
      response=>{
        if(response.success){
          this.toast.add({severity: 'success', summary: 'Success', detail: 'Updated successfully in CLient Met'});
          console.log(response)
          this.displayDialog = false;
          this.getClients();
        }
    });
  }
  cancel() {
    this.displayDialog = false;
  }

  updateClientMet(clientId,projectId){
    this.displayDialog = true;
    this.clientMetDetails.clientId=clientId;
    this.clientMetDetails.projectId=projectId;
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
