import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestMethod} from '../requirement-form-service.service';
import {DesignerOnBoardClientsApiResponse} from '../../Models/Designer/DesignerOnBoardClientsApiResponse';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  env = environment;
  constructor(private _http: HttpClient) { }
  getOnBoardClients() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      RequestMethod: RequestMethod.Get
    };

    return this._http.get(this.env.backendURL + '/v1/admin/designer-on-board-clients', httpOptions)
      .map(response => {
        return response as DesignerOnBoardClientsApiResponse;
      });
  }
}
