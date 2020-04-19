import { Component, OnInit } from '@angular/core';
import { DesignerClientMetService } from 'app/Services/designer-client-met.service';
import { DesignerClientMet } from 'app/Models/DesignerClientMet';

@Component({
  selector: 'app-designer-client-met',
  templateUrl: './designer-client-met.component.html',
  styleUrls: ['./designer-client-met.component.scss']
})
export class DesignerClientMetComponent implements OnInit {
  fetchedDesignerClientMet: DesignerClientMet[] = [];

  constructor(private designerClientMetService: DesignerClientMetService,
    ) { }

  ngOnInit() {

    this.designerClientMetService.getClients().subscribe(
      response => {
        console.log('designerClientMetService-->', response)
        if(response.success){
          this.fetchedDesignerClientMet = response.data.allClients
        }
      }
    )
  }

}
