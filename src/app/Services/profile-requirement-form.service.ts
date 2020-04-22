import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestMethod} from './requirement-form-service.service';

import { OnSiteRequirementFormData } from 'app/Models/OnSiteRequirementFormData';
import { ModularRequirementFormData } from 'app/Models/ModularRequirementFormData';
import { FurnitureRequirementFormData } from 'app/Models/FurnitureRequirementFormData';

@Injectable({
  providedIn: 'root'
})
export class ProfileRequirementFormService {

  env = environment;
  constructor(private _http: HttpClient) { }

  // On-SITE APIs
  getOnSiteDataDetails(category){
    category=category.split('&').join('%26')
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
        return response as OnSiteRequirementFormResponse;
      });
  }

  getOnSiteCategories(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + "/v1/admin/on-site-categories", httpOptions)
      .map(response => {
        return response as OnSiteCategoryApiResponse;
      });
  }

  // Furniture APIs
  getFurnitureDataDetails(category){
    category = category.split('&').join('%26');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + "/v1/admin/boq-furniture-records?category="+category, httpOptions)
      .map(response => {
        console.log("data",response)
        return response as FurnitureRequirementFormResponse;
      });
  }
  getFurnitureCategories(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + "/v1/admin/boq-furniture-categories", httpOptions)
      .map(response => {
        return response as FurnitureCategoryApiResponse;
      });
  }
  searchFurniture(type, term) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this._http.get(this.env.backendURL + `/v1/admin/boq-search-furniture?type=${type}&term=${term}`, httpOptions)
      .map(response => {
        return response as FurnitureRequirementFormResponse;
      });
  }

  // Modular APIs
  getModularDataDetails(category){
    category=category.split('&').join('%26')
    console.log("category",category)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + "/v1/admin/boq-modular-records?category="+category, httpOptions)
      .map(response => {
        console.log("data",response)
        return response as ModularRequirementFormResponse;
      });
  }

  getModularCategories(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + '/v1/admin/boq-modular-categories', httpOptions)
      .map(response => {
        return response as ModularCategoryApiResponse;
      });
  }
  // final reponse API
  sendFinalSubmitData(finalSubmitData) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }),
        RequestMethod: RequestMethod.Post
      };
      let body = JSON.stringify(finalSubmitData);
      console.log('bodyRequest', body);
      return this._http.post(this.env.backendURL + '/v1/admin/boq-save-data', body, httpOptions)
      .map(response => {
        return response as BOQRfFinalSubmitApiResponse
      });
  }
  getPDFUrl(clientId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };
    return this._http.get(this.env.backendURL + `/v1/admin/boq-generate-pdf?clientId=${clientId}`, httpOptions)
      .map(response => {
        return response;
      });
  }

  getFile(fileUrl) {
    const httpOptions = {
      headers: new HttpHeaders({
        responseType: 'blob' as 'json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };
    return this._http.get(this.env.backendURL + `/static/${fileUrl}`, httpOptions);
  }
  getClientSavedBOQData(clientId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + `/v1/admin/boq-get-data?clientId=${clientId}`, httpOptions)
      .map(response => {
        return response as BOQGetSavedDataApiResponse;
      });
  }
}

export interface OnSiteRequirementFormResponse {
  success: boolean,
  data: OnSiteRequirementFormData[]
}
export interface OnSiteCategoryApiResponse{
  success: boolean,
  data: OnSiteCategoryApiResponseRecord[]
}
export interface OnSiteCategoryApiResponseRecord{
  category: String;
}

export interface FurnitureRequirementFormResponse {
  success: boolean,
  data: FurnitureRequirementFormData[]
}
export interface FurnitureCategoryApiResponse{
  success: boolean,
  data: FurnitureCategoryApiResponseRecord[]
}
export interface FurnitureCategoryApiResponseRecord{
  category: String;
}


export interface ModularRequirementFormResponse {
  success: boolean,
  data: ModularRequirementFormData[]
}
export interface ModularCategoryApiResponse{
  success: boolean,
  data: ModularCategoryApiResponseRecord[]
}
export interface ModularCategoryApiResponseRecord{
  category: String;
}

export interface BOQRfFinalSubmitApiResponse {
  success: boolean,
  data: []
}

export interface BOQGetSavedDataApiResponse {
  success: boolean,
  data: {
    onsite: BOQGetSavedOnSiteApiResponse[],
    furniture: BOQGetSavedFurnitureApiResponse[],
    modular: BOQGetSavedModularApiResponse[]
  }
}

export interface BOQGetSavedOnSiteApiResponse {
  id: number,
  nos: number,
  length: number,
  height: number,
  width: number,
  quantity: number,
  total: number,
  item_type: String,
  item_description: String,
  unit:  String ,
  rate: number
}

export interface BOQGetSavedFurnitureApiResponse {
  id: number,
  quantity: number,
  total: number,
  item_type: String,
  item_code: String,
  item_name: String,
  item_description: String,
  unit: String,
  rate: number,
  breadth: number,
  length: number,
  height: number,
  main_rate: number,
  url: String
}

export interface BOQGetSavedModularApiResponse {
  id: number,
  quantity: number,
  total: number,
  item_type: String,
  item_code: String,
  item_name: String,
  item_description: String,
  unit: String,
  rate: number,
  breadth: number,
  length: number,
  height: number,
  main_rate: number,
  url: String
}
