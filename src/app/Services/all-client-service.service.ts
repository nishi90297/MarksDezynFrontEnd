import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { AllClientsData } from 'app/Models/AllClientsData';

@Injectable({
  providedIn: 'root'
})
export class AllClientServiceService {

  env = environment

  constructor( private http: HttpClient) { }

  getAllClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-all-clients', httpOptions)
      .map(response => {
        return response as AllClientsApiResponse;
      });
    
  }
}

export interface AllClientsApiResponse {
  success: boolean,
  data: AllClientsData[];
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
