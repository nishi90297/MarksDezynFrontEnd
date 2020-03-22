import { Component, OnInit } from '@angular/core';
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
    clietId:0,
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

  public openConfirmationDialog(clietId,projectId) {
    this.confirmationBoxService.confirm('Minutes of Meeting(Pls document)')
      .then((confirmed) => {console.log('User confirmed:', confirmed);
      if(confirmed){ this.updateClientMet(clietId,projectId)}})
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public updateClientMet(clietId,projectId){
    const mom= this.confirmationBoxService.getMOM();
    this.clientMetDetails.clietId=clietId;
    this.clientMetDetails.projectId=projectId;
    this.clientMetDetails.mom=mom;
    this.designerAssignedClientService.updateClientMet(this.clientMetDetails)
  }

}
