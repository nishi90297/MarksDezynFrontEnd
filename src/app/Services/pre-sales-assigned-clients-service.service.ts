import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CheckRequirementFormResponse, RequestMethod} from './requirement-form-service.service';
import {PreSalesAssignClient} from '../Models/PreSalesAssignClient';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreSalesAssignedClientsServiceService {

  env = environment
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
        console.log('getClientsResponse', response)
      });
  }
}
