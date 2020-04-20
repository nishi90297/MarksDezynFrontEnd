import { Component, OnInit } from '@angular/core';
import {AdminDashboardService} from '../../Services/admin-dashboard.service';

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

  cars: Car[];
  cols: any[];
  // To be assigned
  toBeAssignedOptions = {
    cols: [],
    values: [],
    rows: 2
  };
  constructor(private adminDataService: AdminDashboardService) { }

  ngOnInit() {

    this.cars = [
      {
        vin: 22343,
        year: 2019,
        brand: 'Honda',
        color: 'black'
      },
      {
        vin: 1233,
        year: 2014,
        brand: 'volkswagen',
        color: 'Blue'
      }
    ];
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
    this.setTobeAssignedTableOptions();
    this.getUnAssigned();
  }

  // to be assigned
  getUnAssigned() {
    this.adminDataService.showToBeAssigned().subscribe(response => {
      if (response.success) {
        console.log('Tobe assigned data -->', response);
        this.toBeAssignedOptions.values = response.data
      }
    });
  }
  setTobeAssignedTableOptions() {
    this.toBeAssignedOptions.cols = [
      {field: 'meeting_datetime', header: 'DOM'},
      {field: 'id', header: 'ID'},
      {field: 'first_name', header: 'First Name'},
      {field: 'last_name', header: 'Last Name'},
      {field: 'mobile', header: 'Contact'}
    ];
  }
}
