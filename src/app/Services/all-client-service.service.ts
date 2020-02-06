import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllClientServiceService {

  response: ClientRegisterResponse;

  constructor( private http: HttpClient) { }

  showAllClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };
    
    return this.http.get('http://localhost:4000/v1/admin/fetch-all-client',httpOptions)
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
