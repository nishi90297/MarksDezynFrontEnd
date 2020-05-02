import { Component, OnInit } from '@angular/core';
import { FilterUtils, MessageService } from 'primeng/api';
import { AdminPresalesService } from 'app/Services/admin-presales.service';
import { AllClientServiceService } from 'app/Services/all-client-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-all-clients',
  templateUrl: './admin-all-clients.component.html',
  styleUrls: ['./admin-all-clients.component.scss'],
  providers: [MessageService]
})
export class AdminAllClientsComponent implements OnInit {

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

  fixedPreSalesOptions = [];
  selectedValues = [];

  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };
  constructor(private router: Router,private adminAllClientsService:AllClientServiceService,
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
    this.adminAllClientsService.getAllClients().subscribe(response => {
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
      { field: 'status', header: 'Status' },
      { field: 'delay', header: 'Delay' },
      { field: 'visitingCharges', header: 'Visting Charges' },
      { field: 'vcReceived', header: 'VCReceived' },
      { field: 'registered_by', header: 'Registered By' },
      { field: 'designer', header: 'Designer' },
      { field: 'teamLead', header: 'Team Lead' },
    ];
    this.fixedPreSalesOptions=this.presalesOptions.cols;

  }

  toggle(){
    if(this.selectedValues.length==0){
      this.presalesOptions.cols=this.fixedPreSalesOptions;
    } else{
      this.presalesOptions.cols=this.fixedPreSalesOptions.filter(obj=>{
        console.log(obj.field);
        console.log(this.selectedValues)
        console.log(this.selectedValues.includes(obj.field))
        return this.selectedValues.includes(obj.field)});
    }
    
  }
  // tillDate(){
  //   const currentYear=new Date().getFullYear();

  //   new Date(1-April-2020)
  //   this.presalesOptions.values.map(obj=> {
  //     console.log(new Date(obj.meeting_datetime));
  //   })
  // }
  onRowSelect(event){
    const url='/dashboard/profile?id='+event.data.id
    this.router.navigateByUrl(url);
  }
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
