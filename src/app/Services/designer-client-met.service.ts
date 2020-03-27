import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestMethod} from './requirement-form-service.service';
import { DesignerClientMet } from 'app/Models/DesignerClientMet';

@Injectable({
  providedIn: 'root'
})
export class DesignerClientMetService {

  env = environment;
  constructor(private _http: HttpClient) { }

  getClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + '/v1/admin/designer/client-met', httpOptions)
      .map(response => {
        return response as DesignerClientMetResponse;
      });
  }
}

export interface DesignerClientMetResponse {
  success: boolean,
  data: DesignerClientMetData
}
export interface DesignerClientMetData {
  allClients: DesignerClientMet[],
}
