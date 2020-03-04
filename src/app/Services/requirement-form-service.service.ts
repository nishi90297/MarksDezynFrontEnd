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
  response: FillRequirementFormResponse
  valid: CheckRequirementFormResponse
  constructor(private _http: HttpClient) { }

  checkTokenValid(urlToken){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
        'Authorization': 'kT/sWAO11hJIRkREM91810c2G2OhXXcBRAjsx8VVxJvY5uELpw81MI2UcUKYGtEQ8u/QsD5dgP4BA38MT6X4hqQBRNhHCwWAW4U6UfJZOB2mBhBkRjKUZb5LtGqKbSyyfUySX+lTm/nyWi3atqx/RESALdDN9ispZ7PCXY2fwHCBiNrjD2ILipbHvpw6cwKOHhaPyPR9b8XLVcBCRHbIADdbshoN08a+2B8HjE4+Lyvsw+dGCU/k0A=='
      }),
      RequestMethod: RequestMethod.Get
    };
    return this._http.get(this.env.backendURL + '/v1/admin/check-client-req-form', httpOptions)
    .map(responseStatus => {
      this.valid = responseStatus as CheckRequirementFormResponse;
      return this.response;
    });
  }

  fillReuirementFormDetails(formDetails){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
        'Authorization': 'kT/sWAO11hJIRkREM91810c2G2OhXXcBRAjsx8VVxJvY5uELpw81MI2UcUKYGtEQ8u/QsD5dgP4BA38MT6X4hqQBRNhHCwWAW4U6UfJZOB2mBhBkRjKUZb5LtGqKbSyyfUySX+lTm/nyWi3atqx/RESALdDN9ispZ7PCXY2fwHCBiNrjD2ILipbHvpw6cwKOHhaPyPR9b8XLVcBCRHbIADdbshoN08a+2B8HjE4+Lyvsw+dGCU/k0A=='
      }),
      RequestMethod: RequestMethod.Post
    };
    let body = JSON.stringify(formDetails);
    console.log("bodyRequest",body)
    return this._http.post('localhost:4000/v1/admin/fill-client-req-form', body, httpOptions)
      .map(responseStatus => {
        this.response = responseStatus as FillRequirementFormResponse;
        return this.response;
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
