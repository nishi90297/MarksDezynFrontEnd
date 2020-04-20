import { Component, OnInit } from '@angular/core';
import {AdminDashboardService} from '../../Services/admin-dashboard.service';
import { FilterUtils } from 'primeng/primeng';

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
      {field: 'assignToTL', header: 'Assign To TL'},
      {field: 'assignToDesigner', header: 'Assign To Designer'},
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

  //All DESIGNERS
  
}
