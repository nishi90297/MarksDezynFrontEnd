
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { PreSalesUnassignClient } from 'app/Models/PreSalesUnassignClient';

@Injectable({
  providedIn: 'root'
})
export class UnassignedClientsServiceService {

  env = environment
  response: PreSalesUnassignedClientsResponse;

  constructor( private http: HttpClient) { }

  showUnassignedClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/pre-sales/fetch-all-unassigned-client', httpOptions)
    .map(responseStatus => {
      this.response = responseStatus as PreSalesUnassignedClientsResponse;
      return this.response;
    });
  }
}

export interface PreSalesUnassignedClientsResponse {
  success: boolean,
  data: PreSalesUnassignedClientsResponseData
}
export interface PreSalesUnassignedClientsResponseData {
  allClients: PreSalesUnassignClient[],
}

export enum RequestMethod {
  Get,
  Post,
  Put,
  Delete,
  Options,
  Head,
  Patch
}
