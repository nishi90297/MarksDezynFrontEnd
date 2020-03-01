import { Component, OnInit, Output } from '@angular/core';
import {NgForm, Form} from '@angular/forms';
import { RequirementFormServiceService } from 'app/Services/requirement-form-service.service';
import { LoginComponent } from 'app/Auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import {RequirementFormConfirmationDialogBoxService} from '../../Services/requirement-form-confirmation-dialog-box.service';
import { RenovateImageElement } from 'app/Models/RenovateImageElement';
import { FurnitureOptions } from 'app/Models/FurnitureOptions';
import { RequestRoom } from 'app/Models/RequestRoom';
import { RequirementFormRequest } from 'app/Models/RequirementFormRequest';
import { RequestRoomItem } from 'app/Models/RequestRoomItem';

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
  displayDetailedRequirementsForm: boolean;
  displayThankYouPage:boolean;

  roomNames=["bedRoom","bathRoom","livingRoom","kitchen"];

  renovateImageListJson:RenovateImageElement[]=[];
  
  formDetails:RequirementFormRequest = new RequirementFormRequest();
  renovateImages=[
    {
      value:'Living/Dining',
      type:'livingRoom',
      selected: false,
      imagePath : "assets/img/livingDining.png",
      show:false,
      count:0
    },
    {
      value:'Kitchen',
      type:'kitchen',
      selected: false,
      imagePath : "assets/img/kitchen.png",
      show:false,
      count:0
    },
    {
      value:'Bedroom',
      type:'bedRoom',
      selected: false,
      imagePath : "assets/img/bedrooms.png",
      show:false,
      count:0
    },
    {
      value:'Bathroom',
      type:'bedRoom',
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

  constructor(private requirementFormService: RequirementFormServiceService,
              private cookieService: CookieService,
              private confirmationBoxService: RequirementFormConfirmationDialogBoxService
  ) { }

  ngOnInit() {
    //check whether token is valid or not.
      this.displayBasicRequirementsForm=false;
      this.displayDetailedRequirementsForm=false;
      this.displayThankYouPage=false;
    
      console.log("intitlized form details",this.formDetails)
  }

  public openConfirmationDialog() {
    this.confirmationBoxService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => console.log('User confirmed:', confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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

    this.displayBasicRequirementsForm=false;
    this.displayDetailedRequirementsForm=true;

    // this.formDetails.push("propertyType",form.value.propertyType);
    // this.formDetails.push("unitType",form.value.unitType);
    // this.formDetails.push("livingRoomCount",form.value.livingRoomCount);
    // this.formDetails.push("kitchenCount",form.value.kitchenCount);
    // this.formDetails.push("bedroomCount",form.value.bedroomCount);
    // this.formDetails.push("bathroomCount",form.value.bathroomCount);
    // this.formDetails.push("areaSize",form.value.areaSize);
    // this.formDetails.push("areaUnit",form.value.areaUnit);

    //set cookies
    this.cookieService.set("propertyType",form.value.propertyType);
    this.cookieService.set("unitType",form.value.unitType);
    this.cookieService.set("livingRoomCount",form.value.livingRoomCount);
    this.cookieService.set("kitchenCount",form.value.kitchenCount);
    this.cookieService.set("bedroomCount",form.value.bedroomCount);
    this.cookieService.set("bathroomCount",form.value.bathroomCount);
    this.cookieService.set("areaSize",form.value.areaSize);
    this.cookieService.set("areaUnit",form.value.areaUnit);
    
    //For final request
    console.log("this.formDetails",this.formDetails)
    console.log("form.value.propertyType",form.value.propertyType)
    this.formDetails.propertyType=form.value.propertyType;
    this.formDetails.propertyAge=form.value.unitType;
    this.formDetails.areaSize=form.value.areaSize;

    //for setting count to show rooms components
    if(form.value.propertyType==='Apartment'){
      this.renovateImages[0].count=1
      this.renovateImages[1].count=1
    }
    else if(form.value.propertyType==='Bunglow'){
      this.renovateImages[0].count=form.value.livingRoomCount
      this.renovateImages[1].count=form.value.kitchenCount
    }
    this.renovateImages[2].count=form.value.bedroomCount
    this.renovateImages[3].count=form.value.bathroomCount

    
    //for setting details in room component vaiable(renovateImageListJson)
    for(let i=0;i<this.renovateImages.length;i++){
      if(this.renovateImages[i].selected===true){
        for(let j=0;j<this.renovateImages[i].count;j++){
          let elementDetailFurnitureOptions : FurnitureOptions[]=[];

          this.itemList[i].details.forEach(function (value) {
            elementDetailFurnitureOptions.push({
              label: value.label,
              options: value.options,
              type : value.type
            })
          }); 

          this.renovateImageListJson.push({value:this.renovateImages[i].value+" "+(j+1),
                type:this.renovateImages[i].type,
                show:this.renovateImages[i].show,
                imagePath:this.renovateImages[i].imagePath,
                roomNo:j+1,
                elementDetails:{
                  renovateImage:this.itemList[i].renovateImage,
                  details:elementDetailFurnitureOptions
                }
            })
          }
      }
    }
    console.log("Form details in submitBasicRequirementsForm-->>",this.formDetails);
    console.log("renovateImageListJson",this.renovateImageListJson)

    this.remap();
    console.log("remap form details",this.formDetails)
    for(let i=0;i<1;i++){
        if(this.renovateImageListJson.length==0){
          this.displayThankYouPage=true;
          return;
        }
        this.renovateImageListJson[i].show=true;
    }

    
  }
  submitDetailedRequirementsForm(form:NgForm,renovatePageValue,roomType,roomNo){

    var roomName=form.value.roomName;
    var options={

    }
    // console.log("roomName",roomName);
    this.updateFormDetails(roomType,roomNo,roomName,options);
    console.log("updateFormDetails",this.updateFormDetails);

    for(let i=0;i<this.renovateImageListJson.length;i++){
      if(i==this.renovateImageListJson.length-1){
        this.renovateImageListJson[i].show=false;
        this.displayThankYouPage=true;
        return;
      }
      else if(this.renovateImageListJson[i].value==renovatePageValue){
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

  remap(){
    console.log("calling remap...")
    for(let renovateRomNo=0;renovateRomNo<this.renovateImageListJson.length;renovateRomNo++){
      let room=this.renovateImageListJson[renovateRomNo];
      // console.log(room.type)
      switch(room.type){
        case this.roomNames[0]:{
          this.addLivingDining(room);
          break;
        }
        case this.roomNames[1]:{
          this.addKitchen(room);
          break;
        }
        case this.roomNames[2]:{
          this.addBedroom(room);
          break;
        }
        case this.roomNames[3]:{
          this.addBathroom(room);
          break;
        }
      }

    }

    return this.formDetails;
  }

  addLivingDining(room: RenovateImageElement){
    
    let item = new RequestRoomItem();
    
    this.formDetails.livingRoom.push({
      roomName: '',
      items:[item]
    });
  }
  addKitchen(room: RenovateImageElement){
    let item = new RequestRoomItem();
    
    this.formDetails.kitchen.push({
      roomName: '',
      items:[item]
    });
  }
  addBedroom(room: RenovateImageElement){
    let item = new RequestRoomItem();
    
    this.formDetails.bedRoom.push({
      roomName: '',
      items:[item]
    });
  }
  addBathroom(room: RenovateImageElement){
    let item = new RequestRoomItem();
    
    this.formDetails.bathroom.push({
      roomName: '',
      items:[item]
    });
  }


  updateFormDetails(roomType,roomNo,roomName,options){

      // console.log(room.type)
      switch(roomType){
        case this.roomNames[0]:{
          this.updateLivingDining(roomName,roomNo,options);
          break;
        }
        case this.roomNames[1]:{
          this.updateKitchen(roomName,roomNo,options);
          break;
        }
        case this.roomNames[2]:{
          this.updateBedroom(roomName,roomNo,options);
          break;
        }
        case this.roomNames[3]:{
          this.updateBathroom(roomName,roomNo,options);
          break;
        }
      }
    }

    updateLivingDining(roomName,roomNo,options){
      let room=this.formDetails.livingRoom[roomNo-1]
      room.roomName=roomName;
      room.items=options;
    }
    updateKitchen(roomName,roomNo,options){
      let room=this.formDetails.kitchen[roomNo-1]
      room.roomName=roomName;
      room.items=options;
    }
    updateBedroom(roomName,roomNo,options){
      let room=this.formDetails.bedRoom[roomNo-1]
      room.roomName=roomName;
      room.items=options;
    }
    updateBathroom(roomName,roomNo,options){
      let room=this.formDetails.bathroom[roomNo-1]
      room.roomName=roomName;
      room.items=options;
    }

}
