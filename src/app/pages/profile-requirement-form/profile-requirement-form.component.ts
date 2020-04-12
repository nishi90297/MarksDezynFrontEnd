import { Component, OnInit } from '@angular/core';
import { selectedOnsiteRecord } from 'app/Models/selectedOnSiteRecord';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRequirementFormService, OnSiteCategoryApiResponseRecord, FurnitureCategoryApiResponseRecord, ModularCategoryApiResponseRecord } from 'app/Services/profile-requirement-form.service';

import { OnSiteRequirementFormData } from 'app/Models/OnSiteRequirementFormData';
import { FurnitureRequirementFormData } from 'app/Models/FurnitureRequirementFormData';
import { ModularRequirementFormData } from 'app/Models/ModularRequirementFormData';

import { OnSiteResponse } from 'app/Models/OnSiteResponse';
import { FurnitureResponse } from 'app/Models/FurnitureResponse';
import { ModularResponse } from 'app/Models/ModularResponse';
import { BOQRfFinalSubmitResponse } from 'app/Models/BOQRfFinalSubmitResponse';
@Component({
  selector: 'app-profile-requirement-form',
  templateUrl: './profile-requirement-form.component.html',
  styleUrls: ['./profile-requirement-form.component.scss']
})
export class ProfileRequirementFormComponent implements OnInit {

  clientId: Number;
  clientProfileData: ClientProfileResponseData;
  finalSubmitData: BOQRfFinalSubmitResponse;

  //on-site 
  onSiteCategory:String;
  onSiteEntity:String;
  onSiteAllEntityData: OnSiteRequirementFormData[];
  onSiteCategories: OnSiteCategoryApiResponseRecord[];
  onSiteSelectedRow: OnSiteRequirementFormData[];
  onSiteRows:OnSiteRequirementFormData[];
  onSiteResponseArray: OnSiteResponse[];
  
  //furniture
  furnitureCategory:String;
  furnitureEntity:String;
  furnitureAllEntityData: FurnitureRequirementFormData[];
  furnitureCategories: FurnitureCategoryApiResponseRecord[];
  furnitureSelectedRow: FurnitureRequirementFormData[];
  furnitureRows:FurnitureRequirementFormData[];
  furnitureResponseArray: FurnitureResponse[];

  //modular
  modularCategory:String;
  modularEntity:String;
  modularAllEntityData: ModularRequirementFormData[];
  modularCategories: ModularCategoryApiResponseRecord[];
  modularSelectedRow: ModularRequirementFormData[];
  modularRows:ModularRequirementFormData[];
  modularResponseArray: ModularResponse[];

  constructor(private clientProfileservice:ClientProfileService,private profileRequirementFormService: ProfileRequirementFormService,private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {

    this.onSiteRows=[];
    this.onSiteResponseArray=[];

    this.furnitureRows=[];
    this.furnitureResponseArray=[];

    this.modularRows=[]
    this.modularResponseArray=[];

    this.finalSubmitData=new BOQRfFinalSubmitResponse();

    //get Id from URL
    this.route.queryParams.subscribe(params => {
      this.clientId=params.id;
      console.log(this.clientId)
  })

  //get Profile Data
  this.clientProfileservice.getProfile(this.clientId).subscribe(
    (response) => {
    if (response.success) {
      this.clientProfileData=response.data
      console.log(this.clientProfileData)
    }
  }
  )

  //getOnSiteDataDetails in onSiteAllEntityData
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

  //getOnSiteCategories in onSiteCategories
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

  //getFurnitureDataDetails in furnitureAllEntityData
  this.profileRequirementFormService.getFurnitureDataDetails("").
  subscribe(
    (response)=>{
    if(response.success){
      this.furnitureAllEntityData=response.data;
      console.log(this.furnitureAllEntityData)
    } 
  },
  (error)=>{
    console.log("error in profileRequirementFormService.getFurnitureDataDetails")
  }
  )

  //getFurnitureCategories in furnitureCategories
  this.profileRequirementFormService.getFurnitureCategories().
    subscribe(
      (response)=>{
      if(response.success){
        this.furnitureCategories=response.data;
        console.log(this.furnitureCategories)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getFurnitureCategories")
    }
    )



  //getModularDataDetails in modularAllEntityData
  this.profileRequirementFormService.getModularDataDetails("").
  subscribe(
    (response)=>{
    if(response.success){
      this.modularAllEntityData=response.data;
      console.log(this.modularAllEntityData)
    } 
  },
  (error)=>{
    console.log("error in profileRequirementFormService.getModularDataDetails")
  }
  )

  //getModularCategories in modularCategories
  this.profileRequirementFormService.getModularCategories().
    subscribe(
      (response)=>{
      if(response.success){
        this.modularCategories=response.data;
        console.log(this.modularCategories)
      } 
    },
    (error)=>{
      console.log("error in profileRequirementFormService.getModularCategories")
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

  onSiteRefresh(){
    if(this.onSiteRows.length!=0){
      if(confirm("All OnSite Added fields will be removed !")){
        this.onSiteRows.length=0;
        this.onSiteResponseArray.length=0;
        console.log("onsite refreshed")
        console.log("onSiteRowsData",this.onSiteRows)
        console.log("onSiteResponseData",this.onSiteResponseArray)
      }
    } else{
      alert("OnSite has no data for refresh")
    }
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
  updateOnSiteTotal(total,id){
    console.log("hbjhgfvbhjhgh",this.onSiteResponseArray)
    this.onSiteResponseArray.filter( entity=>{return entity.id==id}).map(entity => entity.total=total)
    console.log("ghbn",this.onSiteResponseArray)
  }

  // countOnSiteTotal(){
  //   this.onSiteResponseArray.map(entity => total=total+entity.total)
  // }
  //furniture
  addFurnitureEntry(selectedCategory,selectedEntity){
    if(selectedCategory==0){
      alert("Please Select Category.")
    }
    else if(selectedEntity==0){
      alert("Please Select Entity.")
    }
    else{
      console.log("addFurnitureEntry",selectedCategory,selectedEntity)
      if(selectedCategory=='allCatgeories'){
        console.log("entering in add all")
        this.furnitureRows.length=0;
        this.furnitureResponseArray.length=0;
        this.getFurnitureDataDetails("")
        this.furnitureCategory="";
        this.furnitureEntity="";
        setTimeout(()=>{this.furnitureAllEntityData.map(entity=>this.furnitureRows.push(entity))
        this.furnitureRows.map(entity=>{
          let tempFurnitureResponseRecord=new FurnitureResponse(entity.id);
          this.furnitureResponseArray.push(tempFurnitureResponseRecord);
        })},1000);
        this.furnitureEntity="";
      }
      else{
        console.log("entering in add ")
        if(this.furnitureRows.length==370){
          console.log("after add all button")
          this.furnitureRows.length=0;
          this.furnitureResponseArray.length=0;
          this.getFurnitureDataDetails(selectedCategory)
          this.furnitureSelectedRow=this.furnitureAllEntityData.filter(entity =>{return (entity.item_description==selectedEntity)})
          this.furnitureRows.push(this.furnitureSelectedRow[0])
          this.furnitureCategory="";
          this.furnitureEntity="";
          let tempFurnitureResponseRecord=new FurnitureResponse(this.furnitureSelectedRow[0].id);
          this.furnitureResponseArray.push(tempFurnitureResponseRecord)
        }
        else if(this.furnitureRows.filter(entity=>{return entity.item_description==selectedEntity}).length!=0){
          this.furnitureCategory="";
          this.furnitureEntity="";
          return alert("You have already added this element.");
        }
        else{
          this.getFurnitureDataDetails(selectedCategory)
          console.log("selectedEntity in else",selectedEntity)
          console.log("CategoryWiseData",this.furnitureAllEntityData)
          this.furnitureSelectedRow=this.furnitureAllEntityData.filter(entity =>{return (entity.item_description==selectedEntity)})
          console.log("EntityWiseData",this.furnitureSelectedRow)
          this.furnitureRows.push(this.furnitureSelectedRow[0])
          console.log("Entity Added",this.furnitureRows)
          this.furnitureCategory="";
          this.furnitureEntity="";
          let tempFurnitureResponseRecord=new FurnitureResponse(this.furnitureSelectedRow[0].id);
          console.log("temporary variable",tempFurnitureResponseRecord)
          this.furnitureResponseArray.push(tempFurnitureResponseRecord)
        }
      }

      console.log("furnitureresponse array",this.furnitureResponseArray)
      console.log("furniture all display rows",this.furnitureRows)
    }
  }

  furnitureDelete(id){
    console.log(this.furnitureRows)
    this.furnitureRows=this.furnitureRows.filter(obj=>obj.id!=id)
    this.furnitureResponseArray=this.furnitureResponseArray.filter(obj=>obj.id!=id)
    console.log(this.furnitureRows)
  }

  furnitureRefresh(){
    if(this.furnitureRows.length!=0){
      if(confirm("All Furniture Added fields will be removed !")){
        this.furnitureRows.length=0;
        this.furnitureResponseArray.length=0;
        console.log("furniture refreshed")
        console.log("furnitureRowsData",this.furnitureRows)
        console.log("furnitureResponseData",this.furnitureResponseArray)
      }
    } else{
      alert("Furniture has no data for refresh")
    }
  }

  getFurnitureDataDetails(category){
    this.profileRequirementFormService.getFurnitureDataDetails(category).
    toPromise().then(
      (response)=>{
      if(response.success){
        this.furnitureAllEntityData=response.data;
        console.log(this.furnitureAllEntityData)
      } 
    }).catch(
    (error)=>{
      console.log("error in profileRequirementFormService.getFurnitureDataDetails")
    }
    )
  }
  updateFurnitureTotal(total,id){
    console.log("hbjhgfvbhjhgh",this.furnitureResponseArray)
    this.furnitureResponseArray.filter( entity=>{return entity.id==id}).map(entity => entity.total=total)
    console.log("ghbn",this.furnitureResponseArray)
  }

  //modular
  addModularEntry(selectedCategory,selectedEntity){
    if(selectedCategory==0){
      alert("Please Select Category.")
    }
    else if(selectedEntity==0){
      alert("Please Select Entity.")
    }
    else{
      console.log("addModularEntry",selectedCategory,selectedEntity)
      if(selectedCategory=='allCatgeories'){
        console.log("entering in add all")
        this.modularRows.length=0;
        this.modularResponseArray.length=0;
        this.getModularDataDetails("")
        this.modularCategory="";
        this.modularEntity="";
        setTimeout(()=>{this.modularAllEntityData.map(entity=>this.modularRows.push(entity))
        this.modularRows.map(entity=>{
          let tempModularResponseRecord=new ModularResponse(entity.id);
          this.modularResponseArray.push(tempModularResponseRecord);
        })},1000);
        this.modularEntity="";
      }
      else{
        console.log("entering in add ")
        if(this.modularRows.length==402){
          console.log("after add all button")
          this.modularRows.length=0;
          this.modularResponseArray.length=0;
          this.getModularDataDetails(selectedCategory)
          this.modularSelectedRow=this.modularAllEntityData.filter(entity =>{return (entity.item_description==selectedEntity)})
          this.modularRows.push(this.modularSelectedRow[0])
          this.modularCategory="";
          this.modularEntity="";
          let tempModularResponseRecord=new ModularResponse(this.modularSelectedRow[0].id);
          this.modularResponseArray.push(tempModularResponseRecord)
        }
        else if(this.modularRows.filter(entity=>{return entity.item_description==selectedEntity}).length!=0){
          this.modularCategory="";
          this.modularEntity="";
          return alert("You have already added this element.");
        }
        else{
          this.getModularDataDetails(selectedCategory)
          console.log("selectedEntity in else",selectedEntity)
          console.log("CategoryWiseData",this.modularAllEntityData)
          this.modularSelectedRow=this.modularAllEntityData.filter(entity =>{return (entity.item_description==selectedEntity)})
          console.log("EntityWiseData",this.modularSelectedRow)
          this.modularRows.push(this.modularSelectedRow[0])
          console.log("Entity Added",this.modularRows)
          this.modularCategory="";
          this.modularEntity="";
          let tempModularResponseRecord=new ModularResponse(this.modularSelectedRow[0].id);
          console.log("temporary variable",tempModularResponseRecord)
          this.modularResponseArray.push(tempModularResponseRecord)
        }
      }

      console.log("modularresponse array",this.modularResponseArray)
      console.log("modular all display rows",this.modularRows)
    }
  }

  modularDelete(id){
    console.log(this.modularRows)
    this.modularRows=this.modularRows.filter(obj=>obj.id!=id)
    this.modularResponseArray=this.modularResponseArray.filter(obj=>obj.id!=id)
    console.log(this.modularRows)
  }

  modularRefresh(){
    if(this.modularRows.length!=0){
      if(confirm("All Modular Added fields will be removed !")){
        this.modularRows.length=0;
        this.modularResponseArray.length=0;
        console.log("modular refreshed")
        console.log("modularRowsData",this.modularRows)
        console.log("modularResponseData",this.modularResponseArray)
    } 
  } else{
      alert("Modular has no data for refresh")
    }
  }

  getModularDataDetails(category){
    this.profileRequirementFormService.getModularDataDetails(category).
    toPromise().then(
      (response)=>{
      if(response.success){
        this.modularAllEntityData=response.data;
        console.log(this.modularAllEntityData)
      } 
    }).catch(
    (error)=>{
      console.log("error in profileRequirementFormService.getModularDataDetails")
    }
    )
  }
  updateModularTotal(total,id){
    console.log("hbjhgfvbhjhgh",this.modularResponseArray)
    this.modularResponseArray.filter( entity=>{return entity.id==id}).map(entity => entity.total=total)
    console.log("ghbn",this.modularResponseArray)
  }

  
  //finalSubmitButton
  sendFinalSubmitData(){
    this.finalSubmitData.onSiteResponseArray=this.onSiteResponseArray;
    this.finalSubmitData.onFurnitureResponseArray=this.furnitureResponseArray;
    this.finalSubmitData.onModularResponseArray=this.modularResponseArray;

    if(this.onSiteResponseArray.length!=0 || this.furnitureResponseArray.length!=0 || this.modularResponseArray.length!=0 ){
      console.log(this.finalSubmitData)
      if(confirm("Do you want to submit?")){
        this.profileRequirementFormService.sendFinalSubmitData(this.finalSubmitData)
        .subscribe(response =>{
          if(response.success){
            alert("Your Data has been Successfully Submitted!");
            this.router.navigate(['/dashboard/designerClientMet']); 
            console.log("final response after success",this.finalSubmitData)
          } else{
            console.log("final response after failure ",this.finalSubmitData)
          }
        })
        
      }
    }
    else{
      alert("Please add Atleast a Field")
    }
  }
}
