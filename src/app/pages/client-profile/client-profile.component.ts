import { Component, OnInit, Input } from '@angular/core';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  constructor(private clientProfileservice:ClientProfileService, private route: ActivatedRoute) { }
  clientProfileData:ClientProfileResponseData;

  clientId: Number; 
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("params.id",params.id);
    this.clientId = params.id;
  })
    console.log("this.clientId",this.clientId)
      this.clientProfileservice.getProfile(this.clientId).subscribe(
        (response) => {
        if (response.success) {
          this.clientProfileData=response.data
          console.log(this.clientProfileData)
        }
      }
      )
    }
}
