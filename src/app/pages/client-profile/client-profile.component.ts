import { Component, OnInit, Input } from '@angular/core';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ProfileRfDialogBoxService } from 'app/Services/profile-rf-dialog-box.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  constructor(private clientProfileservice:ClientProfileService, private confirmationBoxService: ProfileRfDialogBoxService) { }
  clientProfileData:ClientProfileResponseData;

  @Input() clientId: Number; 

  ngOnInit() {
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

    public openConfirmationDialog(clientId) {
      this.confirmationBoxService.confirm('RF DETAILS','view')
    //   this.confirmationBoxService.confirm('RF DETAILS')
    //     .then((response) => {console.log('User confirmed:', response);
    //     this.updateClientMet(clientId,projectId,response)})
    //     .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
}
