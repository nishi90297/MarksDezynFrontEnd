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
  selectedIssues;
  tableHeaders;
  // To be assigned
  toBeAssignedOptions = {
    cols: [],
    values: [],
    rows: 5
  };
  constructor(private adminDataService: AdminDashboardService) { }

  ngOnInit() {
    this.setToBeAssignedTableOptions();
    this.getToBeAssigned();

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

  // to be assigned
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
      {field: 'mobile', header: 'Contact'}
    ];
  }
}
