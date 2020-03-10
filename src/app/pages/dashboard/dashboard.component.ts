import { Component, OnInit } from '@angular/core';
import { AllClientServiceService, ClientRegisterResponseDataProfileInfo } from 'app/Services/all-client-service.service';
import { Router } from '@angular/router';
import { UnassignedClientsServiceService } from 'app/Services/unassigned-clients-service.service';
import { PreSalesUnassignClient } from 'app/Models/PreSalesUnassignClient';

@Component({
    selector: 'dashboard-cmp',
    // moduleId: module.id,
    // templateUrl: 'dashboard.component.html'
    templateUrl: '/dashboard.component.html',
})

export class DashboardComponent implements OnInit{

  private allPreUnassignedClientList:PreSalesUnassignClient[];
  errorMsg: any;
  constructor(private unassignedClientsService: UnassignedClientsServiceService, private router: Router) { }

    ngOnInit(){
      this.showUnassignedClients();
    }

    showUnassignedClients(){
      this.unassignedClientsService.showUnassignedClients().subscribe(
        response => { this.allPreUnassignedClientList=response.data.allClients;
          console.log(response)
        },
        resError => {
          this.errorMsg = resError.message
        },
      );
    }

    sentEmail(id,name){
      alert("Email Sent to "+name)
      console.log("send",id)
    }
  }