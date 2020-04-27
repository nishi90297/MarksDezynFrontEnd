import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit {

  constructor() { }

  userRole:String;
  ngOnInit() {

    this.userRole=localStorage.getItem('role');
  }

}
