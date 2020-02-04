import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AddClientServiceService {

  constructor(private _http: HttpClient) { }

  // saveAddClientBasicDetails(designQuotation:DesignQuotation){
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let body = JSON.stringify(designQuotation);
  //   let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });
  //   return this._http.post('http://localhost:4000/v1/admin/allDetails', body, options)
  //     .map((res: Response) => res.json());
  // }


  // _errorHandler(error: Response) {
  //   console.error(error);
  //   return Observable.throw(error || "Server Error");
  // }
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
