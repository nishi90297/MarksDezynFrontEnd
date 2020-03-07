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
}
export interface DesignerAssignedClientsResponse {
  success: boolean,
  data: DesignerAssignedClients
}
export interface DesignerAssignedClients {
  allClients: DesignerAssignedClient[],
}
