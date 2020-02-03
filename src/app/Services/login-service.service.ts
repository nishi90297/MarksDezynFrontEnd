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
    params.append('email', user.EmailId)
    params.append('password', user.UserPassword)
    console.log( 'params', params.get('email'))
    this.result = this.http.get('http://localhost:4000/v1/admin/login', {params});

    console.log(this.result);
    return this.result;
    /*return this._http.post('http://localhost:4000/v1/admin/login', body, options)
      .map((res: Response) => res.json());*/
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
