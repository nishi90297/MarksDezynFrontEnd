import { Component, OnInit } from '@angular/core';
import { selectedOnsiteRecord } from 'app/Models/selectedOnSiteRecord';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRequirementFormService, OnSiteCategoryApiResponseRecord } from 'app/Services/profile-requirement-form.service';
import { OnSiteRequirementFormData } from 'app/Models/OnSiteRequirementFormData';
import { OnSiteResponse } from 'app/Models/OnSiteResponse';
import { FurnitureRequirementFormData } from 'app/Models/FurnitureRequirementFormData';
import { ModularRequirementFormData } from 'app/Models/ModularRequirementFormData';
@Component({
  selector: 'app-profile-requirement-form',
  templateUrl: './profile-requirement-form.component.html',
  styleUrls: ['./profile-requirement-form.component.scss']
})
export class ProfileRequirementFormComponent implements OnInit {

  clientId: Number;
  clientProfileData: ClientProfileResponseData;

  //on-site 
  onSiteCategory:String;
  onSiteEntity:String;
  onSiteAllEntityData: OnSiteRequirementFormData[];
  onSiteCategories: OnSiteCategoryApiResponseRecord[];
  onSiteSelectedRow: OnSiteRequirementFormData[];
  onSiteRows:OnSiteRequirementFormData[];
  onSiteResponseArray: OnSiteResponse[];
  
  //furniture
  furnitureRows:FurnitureRequirementFormData[];
  onFurnitureResponseArray: OnSiteResponse[];

  //modular
  modularRows:ModularRequirementFormData[];
  onModularResponseArray: OnSiteResponse[];

  constructor(private clientProfileservice:ClientProfileService,private profileRequirementFormService: ProfileRequirementFormService,private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.onSiteRows=[];
    this.onSiteResponseArray=[];
    this.onModularResponseArray=[];
    this.onFurnitureResponseArray=[];
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
  this.profileRequirementFormService.getOnSiteDataDetails("").
    subscribe(
      (response)=>{
      if(response.success){
        this.onSiteAllEntityData=response.data;
        console.log(this.onSiteAllEntityData)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getOnSiteDataDetails")
    }
    )

    this.profileRequirementFormService.getOnSiteCategories().
    subscribe(
      (response)=>{
      if(response.success){
        this.onSiteCategories=response.data;
        console.log(this.onSiteCategories)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getOnSiteCategories")
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
        this.onSiteResponseArray.length=0;
        this.getOnSiteDataDetails("")
        this.onSiteCategory="";
        this.onSiteEntity="";
        setTimeout(()=>{this.onSiteAllEntityData.map(entity=>this.onSiteRows.push(entity))
        this.onSiteRows.map(entity=>{
          let tempOnsiteResponseRecord=new OnSiteResponse(entity.id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord);
        })},1000);
        this.onSiteEntity="";
      }
      else{
        console.log("entering in add ")
        if(this.onSiteRows.length==115){
          console.log("after add all button")
          this.onSiteRows.length=0;
          this.onSiteResponseArray.length=0;
          this.getOnSiteDataDetails(selectedCategory)
          this.onSiteSelectedRow=this.onSiteAllEntityData.filter(entity =>{return (entity.item_description==selectedEntity)})
          this.onSiteRows.push(this.onSiteSelectedRow[0])
          this.onSiteCategory="";
          this.onSiteEntity="";
          let tempOnsiteResponseRecord=new OnSiteResponse(this.onSiteSelectedRow[0].id);
          this.onSiteResponseArray.push(tempOnsiteResponseRecord)
        }
        else if(this.onSiteRows.filter(entity=>{return entity.item_description==selectedEntity}).length!=0){
          this.onSiteCategory="";
          this.onSiteEntity="";
          return alert("You have already added this element.");
        }
        else{
          this.getOnSiteDataDetails(selectedCategory)
          console.log("selectedEntity in else",selectedEntity)
          console.log("CategoryWiseData",this.onSiteAllEntityData)
          this.onSiteSelectedRow=this.onSiteAllEntityData.filter(entity =>{return (entity.item_description==selectedEntity)})
          console.log("EntityWiseData",this.onSiteSelectedRow)
          this.onSiteRows.push(this.onSiteSelectedRow[0])
          console.log("Entity Added",this.onSiteRows)
          this.onSiteCategory="";
          this.onSiteEntity="";
          let tempOnsiteResponseRecord=new OnSiteResponse(this.onSiteSelectedRow[0].id);
          console.log("temporary variable",tempOnsiteResponseRecord)
          this.onSiteResponseArray.push(tempOnsiteResponseRecord)
        }
      }

      console.log("onsiteresponse array",this.onSiteResponseArray)
      console.log("onsite all display rows",this.onSiteRows)
    }
  }

  onSiteDelete(id){
    console.log(this.onSiteRows)
    this.onSiteRows=this.onSiteRows.filter(obj=>obj.id!=id)
    this.onSiteResponseArray=this.onSiteResponseArray.filter(obj=>obj.id!=id)
    console.log(this.onSiteRows)
  }

  getOnSiteDataDetails(category){
    this.profileRequirementFormService.getOnSiteDataDetails(category).
    toPromise().then(
      (response)=>{
      if(response.success){
        this.onSiteAllEntityData=response.data;
        console.log(this.onSiteAllEntityData)
      } 
    }).catch(
    (error)=>{
      console.log("error in profileRequirementFormService.getOnSiteDataDetails")
    }
    )
  }
  updateTotal(total,id){
    console.log("hbjhgfvbhjhgh",this.onSiteResponseArray)
    this.onSiteResponseArray.filter( entity=>{return entity.id==id}).map(entity => entity.total=total)
    console.log("ghbn",this.onSiteResponseArray)
  }

  submitProfileRequirementForm(){
    if(this.onSiteResponseArray.length!=0){
    console.log("final response",this.onSiteResponseArray);
    if(confirm("Do you want to submit?"))
      {this.router.navigate(['/dashboard/designerClientMet']); }
    }
    else{
      alert("Please select atleast a field")
    }
  }
}
