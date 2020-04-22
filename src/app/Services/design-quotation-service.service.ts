import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { DesignQuotation } from 'app/Models/DesignQuotation';

@Injectable({
  providedIn: 'root'
})
export class DesignQuotationServiceService {
  private http: HttpClient
  env = environment
  response: DesignQuotationResponse;
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
        this.response = responseStatus as DesignQuotationResponse;
        return this.response;
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

export interface DesignQuotationResponse {
  success: String;
  data: DesignQuotationResponseData;
}

export interface DesignQuotationResponseData {
  url: String;
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
