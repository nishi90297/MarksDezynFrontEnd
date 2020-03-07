import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CheckRequirementFormResponse, RequestMethod} from './requirement-form-service.service';
import {PreSalesAssignClient} from '../Models/PreSalesAssignClient';
import {environment} from '../../environments/environment';
import {PreSalesUnassignClient} from '../Models/PreSalesUnassignClient';
import {PreSalesUnassignedClientsResponse} from './unassigned-clients-service.service';

@Injectable({
  providedIn: 'root'
})
export class PreSalesAssignedClientsServiceService {

  env = environment;
  response: PreSalesAssignedClientsResponse;
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

    return this._http.get(this.env.backendURL + '/v1/admin/pre-sales/assigned-client', httpOptions)
      .map(response => {
        this.response = response as PreSalesAssignedClientsResponse;
        return response as PreSalesAssignedClientsResponse
      });
  }
}


export interface PreSalesAssignedClientsResponse {
  success: boolean,
  data: PreSalesAssignedClients
}
export interface PreSalesAssignedClients {
  allClients: PreSalesAssignClient[],
}
