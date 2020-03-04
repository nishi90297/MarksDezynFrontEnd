import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequirementFormServiceService {
  private http: HttpClient
  env = environment
  fillRequirementFormResponse: FillRequirementFormResponse
  checkTokenValidResponse: CheckRequirementFormResponse
  constructor(private _http: HttpClient) { }

  checkTokenValid(urlToken){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
        'Authorization': urlToken
      }),
      RequestMethod: RequestMethod.Get
    };
    return this._http.get(this.env.backendURL + '/v1/admin/check-client-req-form', httpOptions)
    .map(responseStatus => {
      console.log("responseStatus",responseStatus)
      this.checkTokenValidResponse = responseStatus as CheckRequirementFormResponse;
      console.log(this.checkTokenValidResponse)
      return this.checkTokenValidResponse;
    });
  }

  fillRequirementFormDetails(formDetails,urlToken){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
        'Authorization': urlToken
      }),
      RequestMethod: RequestMethod.Post
    };
    let body = JSON.stringify(formDetails);
    console.log("bodyRequest",body)
    return this._http.post(this.env.backendURL +'/v1/admin/fill-client-req-form', body, httpOptions)
      .map(responseStatus => {
        this.fillRequirementFormResponse = responseStatus as FillRequirementFormResponse;
        return this.fillRequirementFormResponse;
      });
  }

  _errorHandler(error: Response) {
        console.error("errrrrorrrrrrrrr",error);
        // return Observable.throw(error || "Server Error");
        return Observable
      }
}

export interface CheckRequirementFormResponse{
  success : boolean;
  message : String
  data : [];
}

export interface FillRequirementFormResponse {
  success : boolean;
  message : String
  data : [];
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
