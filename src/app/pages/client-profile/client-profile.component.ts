import { Component, OnInit, Input } from '@angular/core';
import { ClientProfileService } from 'app/Services/client-profile.service';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import { ActivatedRoute } from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {toastMessage} from '../../../assets/enums/toastMessages';
import {ClientTask} from '../../Models/Client/ClientTasksApiResponse';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ClientProfileComponent implements OnInit {

  clientTasks: ClientTask[];
  clientTasksStatus: any[];
  clientProfileData: ClientProfileResponseData;
  clientId: Number;

  constructor(
    private clientProfileService: ClientProfileService,
    private route: ActivatedRoute,
    private toast: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clientId = params.id;
    });
    this.clientTasks=[];
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
          this.populateTaskCheckboxes();
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
  populateTaskCheckboxes() {
    this.clientTasksStatus = [];
    this.clientTasks.forEach(record => {
      if (record.status === 'true') {
        this.clientTasksStatus.push(true)
      } else {
        this.clientTasksStatus.push(false)
      }
    });
  }

  taskCheckboxClicked(currentCheckbox) {
    console.log('Client task status arr-->>', this.clientTasksStatus);
    if(this.clientTasksStatus[currentCheckbox] === true){
      this.confirmationService.confirm({
        message: 'This and all previous tasks will be marked done. Do you confirm?',
        accept: () => {
          if (currentCheckbox > 0 && this.clientTasksStatus[currentCheckbox] === true) {
            for (let _i = 0; _i < currentCheckbox; _i++) {
              this.clientTasksStatus[_i] = true;
            }
          }
        }
      });
    }
  }
  errorPopUp(type, message) {
    console.log('eror toast -------------------------------')
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
