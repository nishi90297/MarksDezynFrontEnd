import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../Services/admin-dashboard.service';
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
  selectedIssues;
  tableHeaders;
  // To be assigned
  toBeAssignedOptions = {
    cols: [],
    values: [],
    columnSize: 1,
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
  allDesignersData: AllDesignersData[];
  allTeamLeadsData: AllTeamLeadersData[];

  assignees:SelectItem[] =[
    { label: 'Select Assignee', value: null },
    { label: 'Team Lead', value: 'teamLead' },
    { label: 'Designer', value: 'designer' }
  ]
  teamLead: SelectItem[] = [
    { label: 'Select Team Lead', value: null }
  ]
  designer: SelectItem[] = [
    { label: 'Select Designer', value: null }
  ]

  selectedAssignee: String;
  selectedTeamLead: number;
  selectedDesigner: number;
  clientId: number;
  clientAssignData: { "clientId": number; "adminId": number; };

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

    this.getAllDesigners();
    this.getAllTeamLeads();
    FilterUtils['custom'] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return parseInt(filter) > value;
    }
  }

  // To be assigned
  getToBeAssigned() {
    this.adminDataService.showToBeAssigned().subscribe(response => {
      if (response.success) {
        console.log('Tobe assigned data -->', response);
        this.toBeAssignedOptions.values = response.data
        console.log(this.toBeAssignedOptions);
      }
    });
  }
  setToBeAssignedTableOptions() {
    this.toBeAssignedOptions.cols = [
      { field: 'meeting_datetime', header: 'DOM' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Contact' },
      { field: 'city', header: 'City' },
      { field: 'package', header: 'Scope' },
      { field: 'vc', header: 'VC' },
      { field: 'assign', header: 'Assign' },
      { field: 'registeredBy', header: 'Registered By' }
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
      { field: 'meeting_datetime', header: 'DOM' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Contact' },
      { field: 'mobile', header: 'Contact' },
      { field: 'city', header: 'City' },
      { field: 'package', header: 'Scope' },
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
      { field: 'meeting_datetime', header: 'DOM' },
      { field: 'id', header: 'ID' },
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'mobile', header: 'Contact' }
    ];
  }
  //All Designer
  getAllDesigners() {
    this.adminDataService.getAllDesigners().subscribe(response => {
      if (response.success) {
        console.log('All Designers -->', response);
        this.allDesignersData = response.data
        this.allDesignersData.forEach(element => {
          this.designer.push({ label: element.first_name, value: element.id });
        });
      }
    })
  }

  //All Team Leads
  getAllTeamLeads() {
    this.adminDataService.getAllTeamLeads().subscribe(response => {
      if (response.success) {
        console.log('All Team Leads -->', response);
        this.allTeamLeadsData = response.data;
        this.allTeamLeadsData.forEach(element => {
          this.teamLead.push({ label: element.first_name, value: element.id });
        });
      }
    })
  }

  onAssignClick(id) {
    console.log("coming", id)
    this.clientId=id;
    this.displayDialog = true;
    console.log(this.allTeamLeadsData.filter(obj => obj.first_name));
  }

  save() {

    if(this.selectedAssignee=="teamLead"){
      this.clientAssignData={"clientId":this.clientId,"adminId":this.selectedTeamLead}
      console.log("Team Lead clientAssignData",this.clientAssignData)
      this.adminDataService.assignToTeamLead(this.clientAssignData).subscribe(response => {
        if (response.success) {
          alert("Client has been successfully Assigned!");
          this.displayDialog = false;
          window.location.reload();
        }
    })
    } else if(this.selectedAssignee=="designer"){
      this.clientAssignData={"clientId":this.clientId,"adminId":this.selectedDesigner}
      console.log("Designer clientAssignData",this.clientAssignData)
      this.adminDataService.assignToDesigner(this.clientAssignData).subscribe(response => {
        if (response.success) {
          alert("Client has been successfully Assigned!");
          this.displayDialog = false;
          window.location.reload();
        }
    })
    }
  }
  cancel() {
    this.displayDialog = false;
  }

  onRowSelect(event) {
    console.log("redirecting to profile page")
  }

}
