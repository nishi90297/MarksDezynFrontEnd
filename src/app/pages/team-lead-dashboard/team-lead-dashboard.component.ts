import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminDashboardService } from '../../Services/admin-dashboard.service';
import { FilterUtils, SelectItem } from 'primeng/primeng';
import { AllDesignersData } from 'app/Models/AllDesignersData';
import { AllTeamLeadersData } from 'app/Models/AllTeamLeadersData';
import {MessageService} from 'primeng/api';
import { TeamLeadDashboardService } from 'app/Services/team-lead-dashboard.service';

@Component({
  selector: 'app-team-lead-dashboard',
  templateUrl: './team-lead-dashboard.component.html',
  styleUrls: ['./team-lead-dashboard.component.scss'],
  providers: [MessageService]
})
export class TeamLeadDashboardComponent implements OnInit {
  cols: any[];

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
  // Payment due
  paymentDueOptions = {
    cols: [],
    values: [],
    rows: 5
  };
  // New sign ups
  newSignUpOptions = {
    cols: [],
    values: [],
    rows: 5
  };

  displayDialog: boolean;
  allDesignersData: AllDesignersData[];
  allTeamLeadsData: AllTeamLeadersData[];

  designer: SelectItem[] = [
    { label: 'Select Designer', value: null }
  ]

  selectedAssignee: String;
  selectedDesigner: number;
  clientId: number;
  clientAssignData: { "clientId": number; "adminId": Number; };
  adminId:Number;
  // All error
  errorTypes = {
    internalServerError: 'Internal Server Error',
    somethingWentWrong: 'Something went wrong'
  };
  constructor(private teamLeadDataService: TeamLeadDashboardService ,
    private toast: MessageService) { }

  ngOnInit() {

    // To be assigned
    this.setToBeAssignedTableOptions();
    this.getToBeAssigned();

    // Assigned Not Met
    this.setAssignedNotMetOptions();
    this.getAssignedNotMet();

    // Delayed Proposals
    this.getDelayedProposals();
    this.setDelayedProposalsOptions();

    // Payment Due
    this.getPaymentDueClients();
    this.setPaymentDueClients();

    // New Sign ups
    this.getNewSignUps();
    this.setNewSignUps();

    this.getAllDesigners();

    this.adminId=Number(localStorage.getItem('adminId'));
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
    this.teamLeadDataService.showToBeAssigned().subscribe(response => {
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
      { field: 'vc', header: 'Visit Charges' },
      { field: 'assign', header: 'Assign' },
      { field: 'registeredBy', header: 'Registered By' }
    ];
  }

  // Assigned Not Met
  getAssignedNotMet() {
    this.teamLeadDataService.showAssignedNotMet().subscribe(response => {
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
      { field: 'city', header: 'City' },
      { field: 'package', header: 'Scope' },
      { field: 'assignedTo', header: 'Assigned To'},
      { field: 'tat', header: 'TAT'}
    ];
  }

  // Delayed Proposals
  getDelayedProposals() {
    this.teamLeadDataService.showDelayedProposals().subscribe(response => {
      if (response.success) {
        console.log('Delayed Proposals -->', response);
        this.delayedProposalsOptions.values = response.data
      }
    }, error => {
      this.errorPopUp(this.errorTypes.internalServerError, error.message);
    });
  }
  setDelayedProposalsOptions() {
    this.delayedProposalsOptions.cols = [
      { field: 'meeting_datetime', header: 'DOM' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Contact' },
      { field: 'city', header: 'City' },
      { field: 'package', header: 'Scope' },
      { field: 'assignedTo', header: 'Assigned To'},
      { field: 'tat', header: 'TAT'}
    ];
  }

  // Payment Due
  getPaymentDueClients() {
    this.teamLeadDataService.showPaymentDues().subscribe(response => {
      if (response.success) {
        console.log('Payment Dues -->', response);
        this.paymentDueOptions.values = response.data
      }
    }, error => {
      this.errorPopUp(this.errorTypes.internalServerError, error.message);
    });
  }
  setPaymentDueClients() {
    this.paymentDueOptions.cols = [
      { field: 'dosp', header: 'DOSP' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Contact' },
      { field: 'city', header: 'City' },
      { field: 'package', header: 'Scope' },
      { field: 'assignedTo', header: 'Assigned To'},
    ];
  }

  // New Sign ups
  getNewSignUps(){
    this.teamLeadDataService.showNewSignUps().subscribe(response => {
      if (response.success) {
        console.log('New Sign ups -->', response);
        this.newSignUpOptions.values = response.data
      }
    }, error => {
      this.errorPopUp(this.errorTypes.internalServerError, error.message);
    });
  }
  setNewSignUps(){
    this.newSignUpOptions.cols = [
      { field: 'dosp', header: 'DOSP' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Contact' },
      { field: 'city', header: 'City' },
      { field: 'package', header: 'Scope' },
      { field: 'assignedTo', header: 'Assigned To'},
    ];
  }

  //All Designer
  getAllDesigners() {
    this.teamLeadDataService.getAllDesigners().subscribe(response => {
      if (response.success) {
        console.log('All Designers -->', response);
        this.allDesignersData = response.data
        this.allDesignersData.forEach(element => {
          this.designer.push({ label: element.first_name, value: element.id });
        });
      }
    })
  }

  onAssignClick(id) {
    console.log("coming", id)
    this.clientId=id;
    this.displayDialog = true;
  }

  save() {

    if(this.selectedAssignee=="self"){
      console.log("adminId",this.adminId);
      this.clientAssignData={"clientId":this.clientId,"adminId":this.adminId}
      console.log("Team Lead clientAssignData",this.clientAssignData)
      this.teamLeadDataService.assignToTeamLead(this.clientAssignData).subscribe(response => {
        if (response.success) {
          this.toast.add({severity: 'success', summary: 'Success', detail: 'Client has been successfully Assigned!'});
          this.displayDialog = false;
          this.getToBeAssigned();
          this.getAssignedNotMet();
        }
        }, error => {
          this.errorPopUp(this.errorTypes.internalServerError, error.message);
        });
    } else if(this.selectedAssignee=="designer"){
      if(this.selectedDesigner){
      this.clientAssignData={"clientId":this.clientId,"adminId":this.selectedDesigner}
      console.log("Designer clientAssignData",this.clientAssignData)
      this.teamLeadDataService.assignToDesigner(this.clientAssignData).subscribe(response => {
        if (response.success) {
          this.toast.add({severity: 'success', summary: 'Success', detail: 'Client has been successfully Assigned!'});
          this.displayDialog = false;
          this.getToBeAssigned();
          this.getAssignedNotMet();
        }
      }, error => {
        this.errorPopUp(this.errorTypes.internalServerError, error.message);
      });
    } else{
      this.infoPopUp(this.errorTypes.internalServerError, 'Please Select a Designer!');
    }
    } else{
      this.infoPopUp(this.errorTypes.internalServerError, 'Please Select a Assignee!');
    }
  }
  cancel() {
    this.displayDialog = false;
  }

  onRowSelect(event) {
    console.log("redirecting to profile page")
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
      summary: "INFO",
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
}   
