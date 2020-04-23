import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToBeAssignedData } from 'app/Models/ToBeAssignedData';
import { AssignedNotMetData } from 'app/Models/AssignedNotMetData';
import { AllDesignersData } from 'app/Models/AllDesignersData';
import { AllTeamLeadersData } from 'app/Models/AllTeamLeadersData';

@Injectable({
  providedIn: 'root'
})
export class TeamLeadDashboardService {

  env = environment;
  toBeAssignedResponse : ToBeAssignedApiResponse;
  assignedNotMetResponse : AssignedNotMetApiResponse;
  getAllDesignersResponse : GetAllDesignerApiResponse;
  getAllTeamLeadsResponse : GetAllTeamLeadsApiResponse;
  assignToDesignerResponse : AssignToDesignerApiResponse;
  assignToTeamLeadResponse : AssignToTeamLeadApiResponse;
  constructor( private http: HttpClient) { }

  showToBeAssigned(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/teamLead-to-be-assigned', httpOptions)
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

    return this.http.get(this.env.backendURL + '/v1/admin/teamLead-assigned-not-met', httpOptions)
    .map(responseStatus => {
      this.assignedNotMetResponse = responseStatus as AssignedNotMetApiResponse;
      return this.assignedNotMetResponse;
    });
  }

  //All Designers
  getAllDesigners(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/designer-all', httpOptions)
    .map(responseStatus => {
      this.getAllDesignersResponse = responseStatus as GetAllDesignerApiResponse;
      return this.getAllDesignersResponse;
    });
  }

  //All TeamLeads
  getAllTeamLeads(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/team-leader-all', httpOptions)
    .map(responseStatus => {
      this.getAllTeamLeadsResponse = responseStatus as GetAllTeamLeadsApiResponse;
      return this.getAllTeamLeadsResponse;
    });
  }

  //Client Assigned to Designer
  assignToDesigner(clientAssignData){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };
    let body = JSON.stringify(clientAssignData);
    console.log("body",body);
    return this.http.post(this.env.backendURL + '/v1/admin/admin-assignTo-designer',body, httpOptions)
    .map(responseStatus => {
      this.assignToDesignerResponse = responseStatus as AssignToDesignerApiResponse;
      return this.assignToDesignerResponse;
    });
  }

  //Client assigned to Team Lead
  assignToTeamLead(clientAssignData){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };
    let body = JSON.stringify(clientAssignData);
    console.log("body",body);
    return this.http.post(this.env.backendURL + '/v1/admin/admin-assignTo-tl',body, httpOptions)
    .map(responseStatus => {
      this.assignToTeamLeadResponse = responseStatus as AssignToTeamLeadApiResponse;
      return this.assignToTeamLeadResponse;
    });
  }
}

export interface ToBeAssignedApiResponse {
  success: boolean,
  data: ToBeAssignedData[];
}

export interface AssignedNotMetApiResponse {
  success: boolean,
  data: AssignedNotMetData[];
}

export interface GetAllDesignerApiResponse {
  success: boolean,
  data: AllDesignersData[];
}

export interface GetAllTeamLeadsApiResponse {
  success: boolean,
  data: AllTeamLeadersData[];
}

export interface AssignToDesignerApiResponse {
  success: boolean,
  msg: String,
  data: [];
}

export interface AssignToTeamLeadApiResponse {
  success: boolean,
  msg: String,
  data: [];
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
