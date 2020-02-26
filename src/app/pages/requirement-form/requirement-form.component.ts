import { Component, OnInit, Output } from '@angular/core';
import {NgForm, Form} from '@angular/forms';
import { RequirementFormServiceService } from 'app/Services/requirement-form-service.service';
import { LoginComponent } from 'app/Auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {
  
  propertyType='Apartment';
  unitType='New';
  livingRoomCount='1';
  kitchenCount='1';
  bedroomCount='1';
  bathroomCount='1';

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
      show:false,
      count:0
    },
    {
      value:'Kitchen',
      selected: false,
      imagePath : "assets/img/kitchen.png",
      show:false,
      count:0
    },
    {
      value:'Bedroom',
      selected: false,
      imagePath : "assets/img/bedrooms.png",
      show:false,
      count:0
    },
    {
      value:'Bathroom',
      selected: false,
      imagePath : "assets/img/bathrooms.png",
      show:false,
      count:0
    }
  ]

  itemList=[
    {
      renovateImage:'Living/Dining',
      details:[{label:"TV Unit",options:["3 Seater Sofa","2 Seater Sofa", "Accent Chair", "Center table", "Side Table"],type:"checkbox"},
               {label:"Bar Cabinet",options:["Bottles Rack","Glass Rack"],type:"checkbox"},
               {label:"Crockery Unit",options:["Cup Rack"," Rack"],type:"checkbox"},
               {label:"Sofa Sets and Tables",options:["Sofa Set","Sofa Set Table"],type:"checkbox"},
               {label:"Dining Tables and Chairs",options:["Dining Table","Dining Chairs"],type:"checkbox"}
              ]
    },
    {
      renovateImage:'Kitchen',
      details:[{label:"Modular Kitchen",options:["3 Seater Sofa","2 Seater Sofa", "Accent Chair", "Center table", "Side Table"],type:"checkbox"},
               {label:"Plumbling",options:["Bottles Rack","Glass Rack"],type:"checkbox"},
               {label:"False Ceiling",options:["Cup Rack","Glass Rack"],type:"checkbox"},
               ]
    },
    {
      renovateImage:'Bedroom',
      details:[{label:"Dresser",options:["3 Seater Sofa","2 Seater Sofa", "Accent Chair", "Center table", "Side Table"],type:"checkbox"},
               {label:"Study Table",options:["Bottles Rack","Glass Rack"],type:"checkbox"},
               {label:"Wardrobes",options:["Cup Rack"," Rack"],type:"checkbox"},
              ]
    },
    {
      renovateImage:'Bathroom',
      details:[{label:"Vanity Storage",options:["3 Seater Sofa","2 Seater Sofa", "Accent Chair", "Center table", "Side Table"],type:"checkbox"},
               {label:"Dismantling Works",options:["Bottles Rack","Glass Rack"],type:"checkbox"},
               {label:"Plumbling",options:["Cup Rack"," Rack"],type:"checkbox"},
              ]
    }
  ]

    // renovateOptions={
    //   LivingAndDining:{
    //       Bed:{
    //         details:["king","queen"],
    //         type:"radio"
    //       }
    //     }
    //   }

  constructor(private requirementFormService:RequirementFormServiceService, private cookieService: CookieService) { }

  ngOnInit() {
    //check whether token is valid or not.
      this.displayBasicRequirementsForm=false;
      this.displayDetailedRequirementsForm=false;
      this.displayThankYouPage=false;
  }
  submitGetStarted(){
    this.displayBasicRequirementsForm=true;
    this.displayDetailedRequirementsForm=false;
    // this.cookieService.get("propertyType")
    // this.cookieService.get("unitType")
    // this.cookieService.get("bedroomCount")
    // this.cookieService.get("bathroomCount")
    // this.cookieService.get("areaSize")
    // this.cookieService.get("areaUnit")
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

    this.renovateImages[0].count=form.value.livingRoomCount
    this.renovateImages[1].count=form.value.kitchenCount
    this.renovateImages[2].count=form.value.bedroomCount
    this.renovateImages[3].count=form.value.bathroomCount
    
    for(let i=0;i<this.renovateImages.length;i++){
      if(this.renovateImages[i].selected===true){
        for(let j=0;j<this.renovateImages[i].count;j++){
          this.renovateImageListJson.push({value:this.renovateImages[i].value+" "+(j+1),
              show:this.renovateImages[i].show,
              imagePath:this.renovateImages[i].imagePath,
              elementDetails:this.itemList[i].details});
          }
      }
    }
    for(let i=0;i<1;i++){
        if(this.renovateImageListJson.length==0){
          this.displayThankYouPage=true;
          return;
        }
        this.renovateImageListJson[i].show=true;
    }
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
