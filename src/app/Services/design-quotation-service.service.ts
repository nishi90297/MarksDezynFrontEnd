import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { DesignQuotation } from 'app/Models/DesignQuotation';
import { GetDataResponseData } from 'app/Models/GetDataResponseData';
import { Design } from 'app/Models/Design';

@Injectable({
  providedIn: 'root'
})
export class DesignQuotationServiceService {
  private http: HttpClient
  env = environment
  saveDataResponse: SaveDataResponse;
  getDataResponse: GetDataResponse;
  
  constructor(private _http: HttpClient) { }

  saveDesignQuotation(designQuotation: DesignQuotation) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Post
    };
    let body = JSON.stringify(designQuotation);
    return this._http.post(this.env.backendURL + '/v1/admin/save-design-quotation', body, httpOptions)
      .map(responseStatus => {
        this.saveDataResponse = responseStatus as SaveDataResponse;
        return this.saveDataResponse;
      });
  }

  getData(clientId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };
    return this._http.get(this.env.backendURL + '/v1/admin/get-design-quotation?clientId='+clientId, httpOptions)
      .map(responseStatus => {
        this.getDataResponse = responseStatus as GetDataResponse;
        return this.getDataResponse;
      });
  }

  generateDesignQuotPDF(){

  }

  _errorHandler(error: Response) {
        console.error(error);
        // return Observable.throw(error || "Server Error");
        return Observable
      }
}

export interface SaveDataResponse {
  success: String;
  data: SaveDataResponseURL;
}

export interface SaveDataResponseURL {
  url: String;
}

export interface GetDataResponse {
  success: String;
  data: Design[];
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
