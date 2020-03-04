import { Component, OnInit } from '@angular/core';
import { AllClientServiceService, ClientRegisterResponseDataProfileInfo } from 'app/Services/all-client-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-clients-list',
  templateUrl: './all-clients-list.component.html',
  styleUrls: ['./all-clients-list.component.scss']
})
export class AllClientsListComponent implements OnInit {
  private allClientDetails:ClientRegisterResponseDataProfileInfo;
  errorMsg: any;
  constructor(private allClientService: AllClientServiceService, private router: Router) { }

    ngOnInit(){
      this.showAllClients();
    }

    showAllClients(){
      this.allClientService.showAllClients().subscribe(
        response => { this.allClientDetails=response.data.allClients;
          console.log(response)
        },
        resError => {
          this.errorMsg = resError.message
        },
      );
    }
  }