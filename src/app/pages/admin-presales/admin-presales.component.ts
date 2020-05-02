import { Component, OnInit } from '@angular/core';
import { FilterUtils, MessageService } from 'primeng/api';
import { AdminPresalesService } from 'app/Services/admin-presales.service';

@Component({
  selector: 'app-admin-presales',
  templateUrl: './admin-presales.component.html',
  styleUrls: ['./admin-presales.component.scss'],
  providers: [MessageService]
})
export class AdminPresalesComponent implements OnInit {

  cols: any[];

  presalesOptions = {
    cols: [],
    values: [],
    columnSize: 1,
    rows: 15
  };

  tableHeaders:any;
  tillDate:any;
  previousWeek:any;
  previousMonth:any;
  dateRange:any;
  onRowSelect:any;
  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };
  constructor(private adminPresalesService:AdminPresalesService,
    private toast: MessageService) { }

  ngOnInit() {
    this.setAllPresalesOptions();
    this.getAllPresales();
  
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

  getAllPresales() {
    this.adminPresalesService.getAllPresales().subscribe(response => {
      if (response.success) {
        console.log('All Presales Data -->', response);
        this.presalesOptions.values = response.data
        console.log(this.presalesOptions);
      }
    }, error => {
      this.errorPopUp(this.errorTypes.internalServerError, error.message);
    });
  }

  setAllPresalesOptions() {
    this.presalesOptions.cols = [
      { field: 'meeting_datetime', header: 'DOM' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Contact' },
      { field: 'city', header: 'City' },
      { field: 'scope_of_work', header: 'Scope' },
      { field: 'status', header: 'Status' },
      { field: 'presales', header: 'PreSales' }
    ];
  }

  // tillDate(){
  //   const currentYear=new Date().getFullYear();

  //   new Date(1-April-2020)
  //   this.presalesOptions.values.map(obj=> {
  //     console.log(new Date(obj.meeting_datetime));
  //   })
  // }

  errorPopUp(type, message) {
    this.toast.add({
      severity: 'error',
      summary: type,
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }

  infoPopUp(type, message) {
    this.toast.add({
      severity: 'info',
      summary: 'INFO',
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
}
