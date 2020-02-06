import { Component, OnInit } from '@angular/core';
import { AllClientServiceService, ClientRegisterResponseDataProfileInfo } from 'app/Services/all-client-service.service';
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard-cmp',
    // moduleId: module.id,
    // templateUrl: 'dashboard.component.html'
    templateUrl: '/dashboard.component.html',
})

export class DashboardComponent implements OnInit{

  private allClientDetails:ClientRegisterResponseDataProfileInfo;
  errorMsg: any;
  constructor(private allClientService: AllClientServiceService, private router: Router) { }

    ngOnInit(){
      this.showAllClients();
    }

    showAllClients(){
      this.allClientService.showAllClients().subscribe(
        response => { this.allClientDetails=response.data.allClients;
           this.allClientDetails.map(element => {
            console.log("b",element)
          });
        },
        resError => {
          this.errorMsg = resError.message
        },
      );
    }
  }