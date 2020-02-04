import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DesignQuotationServiceService {
  private http: HttpClient
  constructor() { }

  generateDesignQuotationForm(designQuotation: DesignQuotation){
   /* var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(designQuotation);
    let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });
    return this._http.get('http://localhost:4000/v1/admin/generate/design-quotation', body)
      .map((res: Response) => res.json());*/
    return this.http.get('http://localhost:4000/v1/admin/login');
  }


  _errorHandler(error: Response) {
    console.error(error);
    // return Observable.throw(error || "Server Error");
    return Observable
  }
}
export interface Design {
  roomType: String;
  count: Number;
}
export interface  DesignQuotation {
  design: Design[];
  view3D: String;
  adhocCharges: Number;
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
