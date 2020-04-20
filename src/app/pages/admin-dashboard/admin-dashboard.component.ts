import { Component, OnInit } from '@angular/core';
import {AdminDashboardService} from '../../Services/admin-dashboard.service';
import { FilterUtils, SelectItem } from 'primeng/primeng';
import { AllDesignersData } from 'app/Models/AllDesignersData';
import { AllTeamLeadersData } from 'app/Models/AllTeamLeadersData';

export interface Car {
  vin;
  year;
  brand;
  color;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  cols: any[];

  // To be assigned
  toBeAssignedOptions = {
    cols: [],
    values: [],
    rows: 5
  };
  // Assigned Not Met
  assignedNotMetOptions = {
    cols: [],
    values: [],
    rows: 5
  };
  // Delayed Proposals
  delayedProposalsOptions = {
    cols: [],
    values: [],
    rows: 5
  };

  displayDialog: boolean;
  allDesignersData:AllDesignersData[];
  allTeamLeadsData:AllTeamLeadersData[];
  
  teamLead :SelectItem[]= [
    {label:'Select Team Lead', value:null}
  ]

  designer :SelectItem[]= [
    {label:'Select Designer', value:null}
  ]
  selectedTeamLead:String;
  selectedDesigner:String;

  constructor(private adminDataService: AdminDashboardService) { }

  ngOnInit() {

    // To be assigned
    this.setToBeAssignedTableOptions();
    this.getToBeAssigned();

    // Assigned Not Met
    this.setAssignedNotMetOptions();
    this.getAssignedNotMet();

   // Delayed Proposals
    this.setDelayedProposalsOptions();
    this.getDelayedProposals();

    FilterUtils['custom'] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
      }

      if (value === undefined || value === null) {
          return false;
      }
      
      return parseInt(filter) > value;
  }

  //All Designer
    this.adminDataService.getAllDesigners().subscribe(response=>{
      if(response.success){
        console.log('All Designers -->',response);
        this.allDesignersData=response.data
        this.allDesignersData.forEach(element => {
          this.designer.push({label:element.first_name,value:element.id});
        });
      }
    })

  //All Team Leads
    this.adminDataService.getAllTeamLeads().subscribe(response=>{
      if(response.success){
        console.log('All Team Leads -->',response);
        this.allTeamLeadsData=response.data;
        this.allTeamLeadsData.forEach(element => {
          this.teamLead.push({label:element.first_name,value:element.id});
        });
      }
    })
  }

  // To be assigned
  getToBeAssigned() {
    this.adminDataService.showToBeAssigned().subscribe(response => {
      if (response.success) {
        console.log('Tobe assigned data -->', response);
        this.toBeAssignedOptions.values = response.data
      }
    });
  }
  setToBeAssignedTableOptions() {
    this.toBeAssignedOptions.cols = [
      {field: 'meeting_datetime', header: 'DOM'},
      {field: 'id', header: 'ID'},
      {field: 'first_name', header: 'First Name'},
      {field: 'last_name', header: 'Last Name'},
      {field: 'mobile', header: 'Contact'},
      {field: 'city', header: 'City'},
      {field: 'scope', header: 'Scope'},
      {field: 'vc', header: 'VC'},
      {field: 'assign', header: 'Assign'},
      {field: 'preSale', header: 'PreSale'}
    ];
  }

  // Assigned Not Met
  getAssignedNotMet() {
    this.adminDataService.showAssignedNotMet().subscribe(response => {
      if (response.success) {
        console.log('Assigned Not Met data -->', response);
        this.assignedNotMetOptions.values = response.data
      }
    });
  }
  setAssignedNotMetOptions() {
    this.assignedNotMetOptions.cols = [
      {field: 'meeting_datetime', header: 'DOM'},
      {field: 'id', header: 'ID'},
      {field: 'first_name', header: 'First Name'},
      {field: 'last_name', header: 'Last Name'},
      {field: 'mobile', header: 'Contact'}
    ];
  }

  // Delayed Proposals
  getDelayedProposals() {
    this.adminDataService.showDelayedProposals().subscribe(response => {
      if (response.success) {
        console.log('Delayed Proposals -->', response);
        this.delayedProposalsOptions.values = response.data
      }
    });
  }
  setDelayedProposalsOptions() {
    this.delayedProposalsOptions.cols = [
      {field: 'meeting_datetime', header: 'DOM'},
      {field: 'id', header: 'ID'},
      {field: 'first_name', header: 'First Name'},
      {field: 'last_name', header: 'Last Name'},
      {field: 'mobile', header: 'Contact'}
    ];
  }


onAssignClick(id) {
    console.log("coming",id)
    this.displayDialog = true;
  console.log(this.allTeamLeadsData.filter(obj=>obj.first_name));
}

save() {
  //save api call
  alert("Client has been successfully Assigned!")
  this.displayDialog = false;
  window.location.reload();
}

cancel() {
  this.displayDialog = false;
}

onRowSelect(event) {
  console.log("redirecting to profile page")
  
}

}
