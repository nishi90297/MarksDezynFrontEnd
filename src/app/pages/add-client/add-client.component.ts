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
    let shareReqFormValue=0;
    if(form.value.shareReqForm){
      shareReqFormValue=1;
    }
    
    this.clientDetails = {
                          title:form.value.title,
                          firstName:form.value.firstName,
                          lastName:form.value.lastName,
                          email:form.value.email,
                          mobile:form.value.contact,
                          address:form.value.address,
                          city:form.value.city,
                          meetingDatetime:form.value.meetingDatetime,
                          shareReqForm:shareReqFormValue,
                          visitCharges: form.value.visitCharges,
                          package: form.value.package
                        };
                          
    console.log(this.clientDetails);
    this.addClientServiceService.saveAddClientBasicDetails(this.clientDetails).subscribe(
      responseStatus => {
        alert("Client Successfully registerd !");
        window.location.reload();
        // this.router.navigate(['/dashboard/addClient']);
        // console.log("responseStatus",responseStatus;
        // this.status = responseStatus.toString();
        // console.log("this.status",this.status)
      }
    )
  }
}
