import { Injectable } from '@angular/core';
import {  Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _http: Http) { }

  validateUserCredentialsInAPI(user: UserLogin) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(user);
    let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });
    return this._http.post('http://localhost:4000/login', body, options)
      .map((res: Response) => res.json());
  }


  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server Error");
  } 
}

export interface UserLogin {
  EmailId: string,
  UserPassword: string,
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
