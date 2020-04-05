import { Component, OnInit } from '@angular/core';
import { onSiteRows } from 'app/Models/onSiteRows';
import { selectedOnsiteRecord } from 'app/Models/selectedOnSiteRecord';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-rfdialog-box',
  templateUrl: './profile-rfdialog-box.component.html',
  styleUrls: ['./profile-rfdialog-box.component.scss']
})
export class ProfileRFDialogBoxComponent implements OnInit {

  onSiteRows:onSiteRows[];
  id:number=0;
  selectedOnSiteRecords:selectedOnsiteRecord[];
  constructor() { }

  ngOnInit() {
    this.onSiteRows=[];
  }

  addOnSiteEntry(){
    this.onSiteRows.push({
      id:this.id,
    })
    this.id++;
  }
  onSiteRefresh(form:NgForm,id){

    console.log("Form Submitted!");
    // form.reset;
  }
  onSiteDelete(id){

    console.log(this.onSiteRows)
    this.onSiteRows=this.onSiteRows.filter(obj=>obj.id!=id)
    console.log(this.onSiteRows)
  }

  onSitePlusButton(){

    // this.onSiteRows.push({
    //   showSearchBar:false,
    //   dataSelected: false
    // });
    // console.log(this.onSiteRows)
  }
  onSiteMinusButton(){
    this.onSiteRows.pop();
  }

  // onSiteCategory(rowNumber){
  //   this.onSiteRows[rowNumber].showSearchBar = !this.onSiteRows[rowNumber].showSearchBar
  // }

  // onSiteRowDataSelected(data, rowNumber) {
  //   this.onSiteRows[rowNumber].dataSelected = true
  // }

  // onSiteDataDeselected(rowNumber) {
  //   this.onSiteRows[rowNumber].dataSelected = false
  // }
}
