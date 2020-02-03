import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private result: Observable<Object>;

  constructor(
    private http: HttpClient
  ) { }

  validateUserCredentialsInAPI(user: UserLogin) {

    const params = new HttpParams()
      .set('email', user.EmailId)
      .set('password', user.UserPassword);
    console.log( 'params', params.toString());
    return this.http.get('http://localhost:4000/v1/admin/login', {params});
  }


  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
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
