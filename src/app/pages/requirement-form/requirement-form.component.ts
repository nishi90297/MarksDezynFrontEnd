import { Component, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { RequirementFormServiceService } from 'app/Services/requirement-form-service.service';
import { LoginComponent } from 'app/Auth/login/login.component';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {
  
  @Output('displayBasicDetailsForm')
  displayBasicDetailsForm: boolean;

  constructor(private requirementFormService:RequirementFormServiceService) { }

  ngOnInit() {
    //check whether token is valid or not.
    // if(this.requirementFormService.validateToken()){
      this.displayBasicDetailsForm=false;
      console.log("heya")
    //   return true;
    // }
    // else{
    //   return false;
    // }
  }
}
