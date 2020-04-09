import { Component, OnInit } from '@angular/core';
import { onSiteRows } from 'app/Models/onSiteRows';
import { selectedOnsiteRecord } from 'app/Models/selectedOnSiteRecord';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRequirementFormService, onSiteCategoryApiResponseRecord } from 'app/Services/profile-requirement-form.service';
import { ProfileRequirementFormData } from 'app/Models/ProfileRequirementFormData';
@Component({
  selector: 'app-profile-requirement-form',
  templateUrl: './profile-requirement-form.component.html',
  styleUrls: ['./profile-requirement-form.component.scss']
})
export class ProfileRequirementFormComponent implements OnInit {

  onSiteRows:onSiteRows[];
  id:number=0;
  clientId: Number;
  selectedOnSiteRecords:selectedOnsiteRecord[];
  clientProfileData: ClientProfileResponseData;
  requirementFormEntities: ProfileRequirementFormData[];
  onSiteCategories: onSiteCategoryApiResponseRecord[];
  constructor(private clientProfileservice:ClientProfileService,private profileRequirementFormService: ProfileRequirementFormService,private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.onSiteRows=[];
    this.route.queryParams.subscribe(params => {
      this.clientId=params.id;
      console.log(this.clientId)
  })
  this.clientProfileservice.getProfile(this.clientId).subscribe(
    (response) => {
    if (response.success) {
      this.clientProfileData=response.data
      console.log(this.clientProfileData)
    }
  }
  )
  this.profileRequirementFormService.getDataDetails("").
    subscribe(
      (response)=>{
      if(response.success){
        this.requirementFormEntities=response.data;
        console.log(this.requirementFormEntities)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getDataDetails")
    }
    )

    this.profileRequirementFormService.getCategories().
    subscribe(
      (response)=>{
      if(response.success){
        this.onSiteCategories=response.data;
        console.log(this.onSiteCategories)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getCategories")
    }
    )
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

  getDataDetails(category){
    this.profileRequirementFormService.getDataDetails(category).
    subscribe(
      (response)=>{
      if(response.success){
        this.requirementFormEntities=response.data;
        console.log(this.requirementFormEntities)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getDataDetails")
    }
    )
  }

}
