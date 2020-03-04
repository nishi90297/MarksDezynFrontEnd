import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllClientServiceService {

  env = environment
  response: ClientRegisterResponse;

  constructor( private http: HttpClient) { }

  showAllClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/fetch-all-client', httpOptions)
    .map(responseStatus => {
      this.response = responseStatus as ClientRegisterResponse;
      return this.response;
    });
  }
}

export interface ClientRegisterResponse {
  success: boolean,
  data: ClientRegisterResponseData
}
export interface ClientRegisterResponseData {
  allClients: ClientRegisterResponseDataProfileInfo,
}

export interface ClientRegisterResponseDataProfileInfo {
  map: any;
  array: any;
  clientId: Number,
  email: String,
  title: String,
  first_name: String,
  last_name: String,
  mobile: String,
  address: null,
  registered: String,
  lastUpdated: String,
  designQuotGenerated: Number,
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
