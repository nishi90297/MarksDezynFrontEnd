import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestMethod} from './requirement-form-service.service';
import { ProfileRequirementFormData } from 'app/Models/ProfileRequirementFormData';

@Injectable({
  providedIn: 'root'
})
export class ProfileRequirementFormService {

  env = environment;
  constructor(private _http: HttpClient) { }

  getDataDetails(category){
    console.log("category",category)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + "/v1/admin/on-site-records?category="+category, httpOptions)
      .map(response => {
        console.log("data",response)
        return response as ProfileRequirementFormResponse;
      });
  }

  getCategories(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + "/v1/admin/on-site-categories", httpOptions)
      .map(response => {
        return response as onSiteCategoryApiResponse;
      });
  }
}


export interface ProfileRequirementFormResponse {
  success: boolean, 
  data: ProfileRequirementFormData[]
}
export interface onSiteCategoryApiResponse{
  success: boolean,
  data: onSiteCategoryApiResponseRecord[]
}
export interface onSiteCategoryApiResponseRecord{
  category: String;
}