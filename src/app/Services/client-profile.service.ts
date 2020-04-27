import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ClientProfileResponseData } from 'app/Models/ClientProfileResponseData';
import {ClientTasksApiResponse} from '../Models/Client/ClientTasksApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  env = environment;
  response: ClientProfileResponse
  constructor(private http: HttpClient) { }

  getProfile(clientId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this.http.get(this.env.backendURL + '/v1/admin/client-profile?clientId=' + clientId, httpOptions)
      .map(response => {
        this.response = response as ClientProfileResponse;
        return this.response
      });
  }

  getTasks(clientId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this.http.get(this.env.backendURL + '/v1/admin/client/tasks?clientId=' + clientId, httpOptions)
      .map(response => {
        return response as ClientTasksApiResponse;
      });
  }
}



export interface ClientProfileResponse {
  success: boolean,
  data: ClientProfileResponseData
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
