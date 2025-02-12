import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private result: Observable<Object>;
  response: AdminRegisterResponse;
  env = environment
  constructor(
    private http: HttpClient
  ) { }

  validateUserCredentialsInAPI(user: UserLogin) {

    const params = new HttpParams()
      .set('email', user.EmailId)
      .set('password', user.UserPassword);
    console.log( 'params', params.toString());
    return this.http.get(this.env.backendURL + '/v1/admin/login', {params})
    .map(responseStatus => {
      this.response = responseStatus as AdminRegisterResponse;
      if(this.response && this.response.data.token){
        localStorage.setItem('currentUser', JSON.stringify(this.response.data));
        localStorage.setItem('token',(this.response.data.token).toString());
        localStorage.setItem('role',(this.response.data.profileInfo.role[0]).toString());
        localStorage.setItem('adminId',(this.response.data.profileInfo.id.toString()));
      }
      return this.response;
    });
  }

  logout() {
    // remove user from local storage to log user out
    if(localStorage.getItem('currentUser')){
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
  // password: String,
  // title: String,
  name: String,
  // first_name: String,
  // last_name: String,
  mobile: String,
  // address: null,
  type: String,
  status: String,
  // visible: Number,
  // created: String,
  // updated: String,
  // activated: null,
  // user_id: Number,
  role: String[],
  // assigned_by: String
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
