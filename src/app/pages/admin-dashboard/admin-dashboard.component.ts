import { Component, OnInit } from '@angular/core';
import {TableModule} from 'primeng/table';

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
  constructor() { }

  ngOnInit() {

    this.cars=[
      {
        vin:22343,
        year:2019,
        brand:'Honda',
        color:'black'
      },
      {
        vin:1233,
        year:2014,
        brand:'volkswagen',
        color:'Blue'
      }
    ]

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  }

}
