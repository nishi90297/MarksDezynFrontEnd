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
  response: AdminRegisterResponse;

  constructor(
    private http: HttpClient
  ) { }

  validateUserCredentialsInAPI(user: UserLogin) {
    
    const params = new HttpParams()
      .set('email', user.EmailId)
      .set('password', user.UserPassword);
    console.log( 'params', params.toString());
    return this.http.get('http://localhost:4000/v1/admin/login', {params})
    .map(responseStatus => {
      this.response = responseStatus as AdminRegisterResponse
      if(this.response && this.response.data.token){
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return this.response;
    });
  }

  logout() {
    // remove user from local storage to log user out
    if(localStorage.getItem('currentUser')){
      alert("You have successfully Logout !");
      localStorage.removeItem('currentUser');
    }   
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

export interface AdminRegisterResponse {
  success: boolean,
  msg: String,
  data: AdminRegisterResponseData
}

export interface AdminRegisterResponseData {
  profileInfo: AdminRegisterResponseDataProfileInfo,
  token: String
}

export interface AdminRegisterResponseDataProfileInfo {
  id: Number,
  email: String,
  password: String,
  title: String,
  first_name: String,
  last_name: String,
  mobile: String,
  address: null,
  type: String,
  status: String,
  visible: Number,
  created: String,
  updated: String,
  activated: null,
  user_id: Number,
  user_role: String,
  assigned_by: String
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
