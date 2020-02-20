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
  renovateImageList=[];
  renovateImageListJson=[];
  selectedRenovateImages:string;
  renovateImages=[
    {
      value:'livingDining',
      selected: false,
      imagePath : "assets/img/livingDining.png",
      show:false
    },
    {
      value:'kitchen',
      selected: false,
      imagePath : "assets/img/kitchen.png",
      show:false
    },
    {
      value:'bedrooms',
      selected: false,
      imagePath : "assets/img/bedrooms.png",
      show:false
    },
    {
      value:'bathrooms',
      selected: false,
      imagePath : "assets/img/bathrooms.png",
      show:false
    }
  ]

  constructor(private requirementFormService:RequirementFormServiceService, private cookieService: CookieService) { }

  ngOnInit() {
    //check whether token is valid or not.
      this.displayBasicRequirementsForm=false;
      this.displayDetailedRequirementsForm=false;
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
    console.log(form.value.propertyType);
    this.cookieService.set("propertyType",form.value.propertyType)
    this.cookieService.set("unitType",form.value.unitType)
    this.cookieService.set("bedroomCount",form.value.bedroomCount)
    this.cookieService.set("bathroomCount",form.value.bathroomCount)
    this.cookieService.set("areaSize",form.value.areaSize)
    this.cookieService.set("areaUnit",form.value.areaUnit)

    for(let i=0;i<this.renovateImages.length;i++){
      if(this.renovateImages[i].selected==true)
          this.renovateImageListJson.push({value:this.renovateImages[i].value,
                                          show:this.renovateImages[i].show});
    }
    for(let i=0;i<1;i++){
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

    this.cookieService.set("renovateImageList",this.selectedRenovateImages)
  }
}
