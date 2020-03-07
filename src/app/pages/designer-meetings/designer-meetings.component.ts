import { Component, OnInit } from '@angular/core';
import {DesignerAssignedClient} from '../../Models/DesignerAssignedClient';
import {DesignerAssignedClientsServiceService} from '../../Services/designer-assigned-clients-service.service';

@Component({
  selector: 'app-designer-meetings',
  templateUrl: './designer-meetings.component.html',
  styleUrls: ['./designer-meetings.component.scss']
})
export class DesignerMeetingsComponent implements OnInit {

  fetchedAssignedClients: DesignerAssignedClient[] = [];

  constructor(
    private designerAssignedClientService: DesignerAssignedClientsServiceService
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

}
