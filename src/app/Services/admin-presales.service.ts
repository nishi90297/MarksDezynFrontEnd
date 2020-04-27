import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { AllPresalesData } from 'app/Models/AllPresalesData';

@Injectable({
  providedIn: 'root'
})
export class AdminPresalesService {
  
  env = environment;
  constructor(private http: HttpClient) { }

  getAllPresales(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-all-presales', httpOptions)
      .map(response => {
        return response as AllPresalesApiResponse;
      });
    
  }
}

export interface AllPresalesApiResponse {
  success: boolean,
  data: AllPresalesData[];
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
