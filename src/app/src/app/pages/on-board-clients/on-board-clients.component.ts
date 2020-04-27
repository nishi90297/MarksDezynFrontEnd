import { Component, OnInit } from '@angular/core';
import {DesignerService} from '../../../../Services/Designer/designer.service';
import {MessageService} from 'primeng/api';
import {DesignerOnBoardClients} from '../../../../Models/Designer/DesignerOnBoardClientsApiResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-on-board-clients',
  templateUrl: './on-board-clients.component.html',
  styleUrls: ['./on-board-clients.component.scss'],
  providers: [MessageService]
})
export class OnBoardClientsComponent implements OnInit {
  onBoardClients: DesignerOnBoardClients[];
  id;
  constructor(
    private designerService: DesignerService,
    private toast: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onBoardClients = [];
    this.getAllOnBoardClients()
  }
  getAllOnBoardClients() {
    this.designerService.getOnBoardClients().subscribe(
      response => {
        if (response.success) {
          console.log(response.data);
          this.onBoardClients = response.data.allClients;

        } else {
          console.log(response);
          this.errorPopUp('Something went wrong!', '');
        }

      },
      error => {
        this.errorPopUp('Internal Server error', error.error.msg);
      }
    )
  }
  doNav(clientId) {
    const url = '/dashboard/profile?id=' + clientId;
    window.location.href = url;
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
