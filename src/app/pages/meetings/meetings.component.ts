import { Component, OnInit } from '@angular/core';
import {PreSalesAssignClient} from '../../Models/PreSalesAssignClient';
import {PreSalesAssignedClientsServiceService} from '../../Services/pre-sales-assigned-clients-service.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  fetchedAssignedClients: PreSalesAssignClient[] = [];
  filteredClients: PreSalesAssignClient[] = [];
  monthList = [''];
  facadeMonthList = [''];

  constructor(
    private preSalesAssignedClientsService: PreSalesAssignedClientsServiceService
  ) { }
  ngOnInit() {
    /*this.fetchedAssignedClients = [
      {
        id : '1',
        name : '1',
        email : '1',
        mobile : '1',
        city : '1',
        meetingDateTime : 'JAN',
        meetingMonth : 'JAN',
        tlName : '1'
      },
      {
        id : '2',
        name : '2',
        email : '2',
        mobile : '2',
        city : '2',
        meetingDateTime : 'FEB',
        meetingMonth : 'FEB',
        tlName : '2'
      },
      {
        id : '3',
        name : '3',
        email : '3',
        mobile : '3',
        city : '3',
        meetingDateTime : 'JAN',
        meetingMonth : 'JAN',
        tlName : '3'
      }
    ];*/
    this.preSalesAssignedClientsService.getClients().subscribe(
      response => {
        if (response.success) {
          this.fetchedAssignedClients = response.data.allClients;
          this.fetchedAssignedClients.push(
            {
              id: 20,
              name: 'Mr. Ashish Dhingra',
              email: 'ash7@gmail.com',
              mobile: '6515893142',
              city: 'DELHI',
              meetingDateTime: '25 May 20 02:55 PM',
              meetingMonth: '05-2020',
              tlName: 'Mr. test test'
            },
            {
              id: 20,
              name: 'Mr. Ashish Dhingra',
              email: 'ash7@gmail.com',
              mobile: '6515893142',
              city: 'DELHI',
              meetingDateTime: '19 May 20 02:55 PM',
              meetingMonth: '05-2020',
              tlName: 'Mr. test ss test'
            }
          );
          this.populateMonthListFromAssignedClientsData();
          this.getMonthClients(this.monthList[0]);

          console.log('fetched clients list ---->>', this.fetchedAssignedClients);
          console.log('Month list ---->>', this.monthList);
        }
      }
    );
  }


  populateMonthListFromAssignedClientsData() {
    this.monthList = [];
    this.facadeMonthList = [];
    for (let clientNo = 0; clientNo < this.fetchedAssignedClients.length; clientNo++) {
      const client = this.fetchedAssignedClients[clientNo];
      const date = new Date(client.meetingDateTime.toString());
      this.monthList.push(client.meetingMonth.toString());
      this.facadeMonthList.push(date.toLocaleString('default', { month: 'long' }));
    }
    this.monthList = [...new Set(this.monthList)];
    this.facadeMonthList = [...new Set(this.facadeMonthList)];
  }

  getMonthClients(month) {
    console.log('selected Month', month);
    this.filteredClients = this.fetchedAssignedClients
      .filter((client: PreSalesAssignClient) => client.meetingMonth === month);
    console.log('matching clients', this.filteredClients)
  }
}
