import { Component, OnInit } from '@angular/core';
import { selectedOnsiteRecord } from 'app/Models/selectedOnSiteRecord';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRequirementFormService, OnSiteCategoryApiResponseRecord } from 'app/Services/profile-requirement-form.service';
import { OnSiteRequirementFormData } from 'app/Models/OnSiteRequirementFormData';
@Component({
  selector: 'app-profile-requirement-form',
  templateUrl: './profile-requirement-form.component.html',
  styleUrls: ['./profile-requirement-form.component.scss']
})
export class ProfileRequirementFormComponent implements OnInit {
  category:String;
  entity:String;
  onSiteRows:OnSiteRequirementFormData[];
  clientId: Number;
  selectedOnSiteRecords:selectedOnsiteRecord[];
  clientProfileData: ClientProfileResponseData;
  requirementFormEntities: OnSiteRequirementFormData[];
  onSiteCategories: OnSiteCategoryApiResponseRecord[];
  selectedRow: OnSiteRequirementFormData[];
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

  addOnSiteEntry(selectedCategory,selectedEntity){
    if(selectedCategory==0){
      alert("Please Select Category.")
    }
    else if(selectedEntity==0){
      alert("Please Select Entity.")
    }
    else{
      console.log("addOnSiteEntry",selectedCategory,selectedEntity)
      if(selectedCategory=='allCatgeories'){
        console.log("entering in add all")
        this.onSiteRows.length=0;
        this.getDataDetails("")
        this.category="";
        this.entity="";
        setTimeout( () => {
        this.requirementFormEntities.map(entity=>this.onSiteRows.push(entity))},1000);
        this.entity="";
      }
      else{
        console.log("entering in add ")
        if(this.onSiteRows.length==115){
          console.log("after add all button")
          this.onSiteRows.length=0;
          this.getDataDetails(selectedCategory)
          this.selectedRow=this.requirementFormEntities.filter(entity =>{return (entity.item_description==selectedEntity)})
          this.onSiteRows.push(this.selectedRow[0])
          this.category="";
          this.entity="";
        }
        else if(this.onSiteRows.filter(entity=>{return entity.item_description==selectedEntity}).length!=0){
          this.category="";
          this.entity="";
          return alert("You have already added this element.");
        }
        else{
          this.getDataDetails(selectedCategory)
          console.log("selectedEntity in else",selectedEntity)
          console.log("CategoryWiseData",this.requirementFormEntities)
          this.selectedRow=this.requirementFormEntities.filter(entity =>{return (entity.item_description==selectedEntity)})
          console.log("EntityWiseData",this.selectedRow)
          this.onSiteRows.push(this.selectedRow[0])
          console.log("Entity Added",this.onSiteRows)
          this.category="";
          this.entity="";
        }
      }
      console.log("all rows",this.onSiteRows)
    }
  }

  onSiteDelete(id){
    console.log(this.onSiteRows)
    this.onSiteRows=this.onSiteRows.filter(obj=>obj.id!=id)
    console.log(this.onSiteRows)
  }

  getDataDetails(category){
    this.profileRequirementFormService.getDataDetails(category).
    toPromise().then(
      (response)=>{
      if(response.success){
        this.requirementFormEntities=response.data;
        console.log(this.requirementFormEntities)
      } 
    }).catch(
    (error)=>{
      console.log("error in profileRequirementFormService.getDataDetails")
    }
    )
  }

}
