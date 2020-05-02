import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AllDesignersData } from 'app/Models/Designer/AllDesignersData';
import { AllTeamLeadersData } from 'app/Models/TeamLead/AllTeamLeadersData';
import { SelectItem, MessageService } from 'primeng/api';
import { AdminDashboardService } from 'app/Services/admin-dashboard.service';

@Component({
  selector: 'app-add-client-bar',
  templateUrl: './add-client-bar.component.html',
  styleUrls: ['./add-client-bar.component.scss']
})
export class AddClientBarComponent implements OnInit {
  userRole:String;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userRole=localStorage.getItem('role');
  }
  openAddClientComponent(){
    this.router.navigate(['/dashboard/addClient']);
  }
  openAllClientComponent(){
    this.router.navigate(['/dashboard/allClients']);
  }
}
