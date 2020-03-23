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

  constructor(
    private designerAssignedClientService: DesignerAssignedClientsServiceService,
    private confirmationBoxService:ClientMetConfirmationDialogBoxService,
  ) { }

  ngOnInit() {

    this.designerAssignedClientService.getClients().subscribe(
      response => {
        console.log('designerAssignedClientService-->', response)
        if(response.success){
          this.fetchedAssignedClients = response.data.allClients
        }
      }
    )
  }

  public openConfirmationDialog(clientId,projectId) {
    this.confirmationBoxService.confirm('Minutes of Meeting(Pls document)')
      .then((response) => {console.log('User confirmed:', response); 
      this.updateClientMet(clientId,projectId,response)})
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public updateClientMet(clientId,projectId,minutesOfMeeting){
    this.clientMetDetails.clientId=clientId;
    this.clientMetDetails.projectId=projectId;
    this.clientMetDetails.mom=minutesOfMeeting;
    this.designerAssignedClientService.updateClientMet(this.clientMetDetails)
    .subscribe(
      response=>{
        console.log(response)
    });
  }

}
