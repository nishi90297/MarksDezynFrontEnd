import { Component, OnInit } from '@angular/core';
import { onSiteRows } from 'app/Models/onSiteRows';

@Component({
  selector: 'app-profile-rfdialog-box',
  templateUrl: './profile-rfdialog-box.component.html',
  styleUrls: ['./profile-rfdialog-box.component.scss']
})
export class ProfileRFDialogBoxComponent implements OnInit {

  onSiteRows:onSiteRows[];
  constructor() { }

  ngOnInit() {
    this.onSiteRows=[{
      showSearchBar:true
    }];
  }

  onSitePlusButton(){

    this.onSiteRows.push({
      showSearchBar:false
    });
    // console.log(this.onSiteRows)
  }
  onSiteMinusButton(){
    this.onSiteRows.pop();
  }

  onSiteCategory(rowNumber){
    this.onSiteRows[rowNumber].showSearchBar=!this.onSiteRows[rowNumber].showSearchBar
  }
}
