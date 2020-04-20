import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ToBeAssignedData } from 'app/Models/ToBeAssignedData';
import { AssignedNotMetData } from 'app/Models/AssignedNotMetData';
import { DelayedProposalsData } from 'app/Models/DelayedProposalsData';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  env = environment;
  toBeAssignedResponse : ToBeAssignedApiResponse;
  assignedNotMetResponse : AssignedNotMetApiResponse;
  delayedProposalsResponse : DelayedProposalsApiResponse;

  constructor( private http: HttpClient) { }

  showToBeAssigned(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-to-be-assigned', httpOptions)
    .map(responseStatus => {
      this.toBeAssignedResponse = responseStatus as ToBeAssignedApiResponse;
      return this.toBeAssignedResponse;
    });
  }

  showAssignedNotMet(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-assigned-not-met', httpOptions)
    .map(responseStatus => {
      this.assignedNotMetResponse = responseStatus as AssignedNotMetApiResponse;
      return this.assignedNotMetResponse;
    });
  }

  showDelayedProposals(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-delayed-proposals', httpOptions)
    .map(responseStatus => {
      this.delayedProposalsResponse = responseStatus as DelayedProposalsApiResponse;
      return this.delayedProposalsResponse;
    });
  }
}

export interface ToBeAssignedApiResponse {
  success: boolean,
  data: ToBeAssignedData;
}

export interface AssignedNotMetApiResponse {
  success: boolean,
  data: AssignedNotMetData;
}

export interface DelayedProposalsApiResponse {
  success: boolean,
  data: DelayedProposalsData;
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
