import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestMethod} from './requirement-form-service.service';
import {PreSalesAssignedClientsResponse} from './pre-sales-assigned-clients-service.service';
import {PreSalesAssignClient} from '../Models/PreSalesAssignClient';
import {DesignerAssignedClient} from '../Models/DesignerAssignedClient';

@Injectable({
  providedIn: 'root'
})
export class DesignerAssignedClientsServiceService {

  env = environment;
  constructor(private _http: HttpClient) { }

  getClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
        // 'Authorization': urlToken
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + '/v1/admin/designer/assigned-client', httpOptions)
      .map(response => {
        return response as DesignerAssignedClientsResponse;
      });
  }

  updateClientMet(clientMetDetails: ClientMetDetails) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Post
    };
    let body = JSON.stringify(clientMetDetails);
    console.log("body",body)
    return this._http.post(this.env.backendURL + '/v1/admin/designer/update-client-met',body, httpOptions)
      .map(response => {
        return response as ClientMetDetailsResponse;
      });
  }


}
export interface DesignerAssignedClientsResponse {
  success: boolean,
  data: DesignerAssignedClients
}
export interface DesignerAssignedClients {
  allClients: DesignerAssignedClient[],
}

export interface ClientMetDetails {
  clientId: Number,
  projectId: Number,
  mom: String
}

export interface ClientMetDetailsResponse {
  success: boolean,
  msg: String,
  data: {}
}
