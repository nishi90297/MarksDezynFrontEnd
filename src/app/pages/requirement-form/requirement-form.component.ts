import { Component, OnInit, Output } from '@angular/core';
import {NgForm, Form} from '@angular/forms';
import { RequirementFormServiceService } from 'app/Services/requirement-form-service.service';
import { LoginComponent } from 'app/Auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { url } from 'inspector';
import { element } from 'protractor';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {
  
  @Output('displayBasicDetailsForm')
  displayBasicRequirementsForm: boolean;
  displayDetailedRequirementsForm : boolean;
  displayThankYouPage:boolean;

  roomsCount=[];
  renovateImageList=[];
  renovateImageListJson=[];
  selectedRenovateImages:string;
  renovateImages=[
    {
      value:'Living/Dining',
      selected: false,
      imagePath : "assets/img/livingDining.png",
      show:false
    },
    {
      value:'Kitchen',
      selected: false,
      imagePath : "assets/img/kitchen.png",
      show:false
    },
    {
      value:'Bedrooms',
      selected: false,
      imagePath : "assets/img/bedrooms.png",
      show:false
    },
    {
      value:'Bathrooms',
      selected: false,
      imagePath : "assets/img/bathrooms.png",
      show:false
    }
  ]

  itemList=[
    {
      renovateImage:'Living/Dining',
      elements:["Wardrobes","Study Table","TV Unit"]
    },
    {
      renovateImage:'Kitchen',
      elements:["Modular Kitchen","Plumbling","False Ceiling"]
    },
    {
      renovateImage:'Bedrooms',
      elements:["Dresser","Study Table","TV Unit","Wardrobes","Plumbling","False Ceiling","Study Table","TV Unit"]
    },
    {
      renovateImage:'Bathrooms',
      elements:["Vanity Storage","Dismantling Works","Plumbling","False Ceiling"]
    }
  ]

  constructor(private requirementFormService:RequirementFormServiceService, private cookieService: CookieService) { }

  ngOnInit() {
    //check whether token is valid or not.
      this.displayBasicRequirementsForm=false;
      this.displayDetailedRequirementsForm=false;
      this.displayThankYouPage=false;
      console.log(this.renovateImages)
  }
  submitGetStarted(){
    this.displayBasicRequirementsForm=true;
    this.displayDetailedRequirementsForm=false;
    //get cookies
  }
  backTOGetStarted(){
    this.displayBasicRequirementsForm=false;
    this.displayDetailedRequirementsForm=false;
    //set cookies
  }

  submitBasicRequirementsForm(form:NgForm){
    //set cookies
    this.displayBasicRequirementsForm=false;
    this.displayDetailedRequirementsForm=true;
    this.cookieService.set("propertyType",form.value.propertyType)
    this.cookieService.set("unitType",form.value.unitType)
    this.cookieService.set("bedroomCount",form.value.bedroomCount)
    this.cookieService.set("bathroomCount",form.value.bathroomCount)
    this.cookieService.set("areaSize",form.value.areaSize)
    this.cookieService.set("areaUnit",form.value.areaUnit)

    this.roomsCount.push(0);
    this.roomsCount.push(0)
    this.roomsCount.push(form.value.bedroomCount)
    this.roomsCount.push(form.value.bathroomCount)

    for(let i=0;i<this.renovateImages.length;i++){
      if(this.renovateImages[i].selected==true)
          this.renovateImageListJson.push({value:this.renovateImages[i].value,
                                          show:this.renovateImages[i].show,
                                          imagePath:this.renovateImages[i].imagePath,
                                          elements:this.itemList[i].elements,
                                          count:this.roomsCount[i]});
    }
    for(let i=0;i<1;i++){
        if(this.renovateImageListJson.length==0){
          this.displayThankYouPage=true;
          return;
        }
        this.renovateImageListJson[i].show=true;
    }

    // this.renovateImageListJson = this.renovateImages.filter(element => { return element.selected })
    // .forEach(element => { 
    //   this.renovateImageListJson.push(
    //     "value",element.value,
    //     "show",element.show)
    //   }
    // );
    // this.renovateImageList=this.renovateImages
    //               .filter(ele => { return ele.selected })
    //               .map((ele) => { return ele.value});

    console.log(this.renovateImageListJson);   
    // this.selectedRenovateImages=this.renovateImageList.map(x=>x).join(",")

    // this.cookieService.set("renovateImageList",this.selectedRenovateImages)
  }

  submitDetailedRequirementsForm(form:NgForm,renovateImageValue){

    for(let i=0;i<this.renovateImageListJson.length;i++){

      if(i==this.renovateImageListJson.length-1){
        this.renovateImageListJson[i].show=false;
        this.displayThankYouPage=true;
        return;
      }
      else if(this.renovateImageListJson[i].value==renovateImageValue){
        this.renovateImageListJson[i].show=false;
        this.renovateImageListJson[i+1].show=true;
        return;
      }
    }
  }

  detailedFormsBackButton(renovateImageValue){
    for(let i=0;i<this.renovateImageListJson.length;i++){

      if(this.renovateImageListJson[i].value==renovateImageValue){
        if(i==0){
          this.displayDetailedRequirementsForm=false;
          this.displayBasicRequirementsForm=true;
          this.renovateImageListJson=[];
          return;
        }
        else {
          this.renovateImageListJson[i].show=false;
          this.renovateImageListJson[i-1].show=true;
          return;
        }
      }
    }
  }
}
