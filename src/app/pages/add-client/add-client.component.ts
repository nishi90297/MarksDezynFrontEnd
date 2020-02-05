import { Component, OnInit } from '@angular/core';
import { AddClientServiceService, ClientDetails } from 'app/Services/add-client-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  clientDetails:ClientDetails;
  errorMsg: string;
  status: string;
  constructor(private addClientServiceService: AddClientServiceService, private router: Router) { }

  ngOnInit() {
  }
  submitAddClientForm(form: NgForm){
    this.clientDetails = {FirstName:form.value.firstName,
                          LastName:form.value.lastName,
                          Email:form.value.email,
                          ContactNumber:form.value.contact,
                          Address:form.value.address};
                          
    console.log(this.clientDetails);
    // this.addClientServiceService.saveAddClientBasicDetails(this.clientDetails).subscribe(
    //   responseStatus => {
    //     this.status = responseStatus.toString();
    //   }
    // )
  }
}
