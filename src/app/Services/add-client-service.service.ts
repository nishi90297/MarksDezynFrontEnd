import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddClientServiceService {
  env = environment
  addClientResponse: AddClientApiResponse;
  constructor(private _http: HttpClient) { }
  saveAddClientBasicDetails(clientDetails:ClientDetails){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Post
    };
    let body = JSON.stringify(clientDetails);
    console.log(body)
    return this._http.post(this.env.backendURL + '/v1/admin/add-client', body, httpOptions)
    .map(responseStatus => {
      this.addClientResponse = responseStatus as AddClientApiResponse;
      return this.addClientResponse;
    });
  }

  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server Error");
  }
}

export interface AddClientApiResponse{
  success:String;
  msg:String;
  data:String;
}


export interface ClientDetails {
  title: String;
  firstName: String;
  lastName: String;
  mobile: number;
  email: String;
  address: String;
  city: String;
  meetingDatetime: String;
  shareReqForm: Number;
  visitCharges: Number;
  package: String;
  scopeOfWork: String;
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
