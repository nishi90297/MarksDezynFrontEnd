import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  showAddClientBar = true;
  allowedRoles = [];
  ngOnInit() {
    this.allowedRoles = ['ROLE_MANAGER', 'ROLE_TL'];
    this.updateAddClientBar();
  }

  updateAddClientBar() {
    const userRole = localStorage.getItem('role');
    if (this.allowedRoles.includes(userRole)) {
      this.showAddClientBar = true
    } else {
      this.showAddClientBar = false
    }
  }
}
