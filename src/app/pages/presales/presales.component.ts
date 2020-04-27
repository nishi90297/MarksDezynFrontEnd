import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presales',
  templateUrl: './presales.component.html',
  styleUrls: ['./presales.component.scss']
})
export class PresalesComponent implements OnInit {

  userRole:String;
  constructor() { }

  ngOnInit() {

    this.userRole=localStorage.getItem('role');
  }

}
