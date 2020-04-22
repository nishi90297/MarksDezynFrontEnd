import { Component, OnInit, Input } from '@angular/core';
import {DesignerAssignedClient} from '../../Models/DesignerAssignedClient';
import {DesignerAssignedClientsServiceService, ClientMetDetails} from '../../Services/designer-assigned-clients-service.service';
import { ClientAddConfirmationDialogBoxComponent } from '../client-add-confirmation-dialog-box/client-add-confirmation-dialog-box.component';
import { ClientMetConfirmationDialogBoxService } from 'app/Services/client-met-confirmation-dialog-box.service';

@Component({
  selector: 'app-designer-meetings',
  templateUrl: './designer-meetings.component.html',
  styleUrls: ['./designer-meetings.component.scss']
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
  constructor(
    private designerAssignedClientService: DesignerAssignedClientsServiceService,
    private confirmationBoxService:ClientMetConfirmationDialogBoxService,
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
    this.designerAssignedClientService.updateClientMet(this.clientMetDetails)
    .subscribe(
      response=>{
        if(response.success){
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
    this.clientMetDetails.mom=this.minutesOfMeeting;
  }
}
