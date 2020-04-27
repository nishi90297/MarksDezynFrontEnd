import { Component, OnInit, Input } from '@angular/core';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import {toastMessage} from '../../../assets/enums/toastMessages';
import {ClientTask} from '../../Models/Client/ClientTasksApiResponse';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  providers: [MessageService]
})
export class ClientProfileComponent implements OnInit {

  clientTasks: ClientTask[];
  clientProfileData: ClientProfileResponseData;
  clientId: Number;

  constructor(
    private clientProfileService: ClientProfileService,
    private route: ActivatedRoute,
    private toast: MessageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clientId = params.id;
    });
    this.getClientProfileData();
    this.getClientTasks();
  }
  getClientProfileData() {
    this.clientProfileService.getProfile(this.clientId).subscribe(
      (response) => {
        if (response.success) {
          this.clientProfileData = response.data;
        } else {
          this.errorPopUp(toastMessage.somethingWentWrong, ' ');
          console.log(response);
        }
      }, error => {
        this.errorPopUp(toastMessage.internalServerError, error.error.msg);
      }
    )
  }
  getClientTasks() {
    this.clientProfileService.getTasks(this.clientId).subscribe(
      response => {
        if (response.success) {
          this.clientTasks = response.data;
        } else {
          this.errorPopUp(toastMessage.somethingWentWrong, '');
          console.log(response);
        }
      },
      error => {
        this.errorPopUp(toastMessage.internalServerError, error.error.msg)
      }
    );
  }
  errorPopUp(type, message) {
    this.toast.add({
      severity: 'error',
      summary: type,
      detail: message,
      closable: true,
      sticky: false,
      life: 4000
    });
  }
}
