import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AddClientServiceService {

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
    return this._http.post('http://localhost:4000/v1/admin/add-client', body, httpOptions)
    .map(res=>res);
  }

  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server Error");
  }
}

export interface ClientDetails {
  title: String;
  firstName: String;
  lastName: String;
  mobile:Number;
  email:String;
  address:String;
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
