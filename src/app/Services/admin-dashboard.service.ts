import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ToBeAssignedData } from 'app/Models/ToBeAssignedData';
import { AssignedNotMetData } from 'app/Models/AssignedNotMetData';
import { DelayedProposalsData } from 'app/Models/DelayedProposalsData';
import { AllDesignersData } from 'app/Models/AllDesignersData';
import { AllTeamLeadersData } from 'app/Models/AllTeamLeadersData';
import {PaymentDueData} from '../Models/admin/PaymentDueData';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  env = environment;
  toBeAssignedResponse: ToBeAssignedApiResponse;
  assignedNotMetResponse: AssignedNotMetApiResponse;
  delayedProposalsResponse: DelayedProposalsApiResponse;
  getAllDesignersResponse: GetAllDesignerApiResponse;
  getAllTeamLeadsResponse: GetAllTeamLeadsApiResponse;
  assignToDesignerResponse: AssignToDesignerApiResponse;
  assignToTeamLeadResponse: AssignToTeamLeadApiResponse;
  constructor( private http: HttpClient) { }

  showToBeAssigned() {
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

  showAssignedNotMet() {
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

  showDelayedProposals() {
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

  // Client which have payment due
  showPaymentDues() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-payment-dues', httpOptions)
      .map(response => {
        return response as PaymentDueApiResponse;
      });
  }

  // Client which have paid all or partially
  showNewSignUps() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };

    return this.http.get(this.env.backendURL + '/v1/admin/admin-new-sign-ups', httpOptions)
      .map(response => {
        return response as NewSignUpsApiResponse;
      });
  }

  // All Designers
  getAllDesigners() {
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

  // All TeamLeads
  getAllTeamLeads() {
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

  // Client Assigned to Designer
  assignToDesigner(clientAssignData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };
    const body = JSON.stringify(clientAssignData);
    console.log('body', body);
    return this.http.post(this.env.backendURL + '/v1/admin/admin-assignTo-designer', body, httpOptions)
    .map(responseStatus => {
      this.assignToDesignerResponse = responseStatus as AssignToDesignerApiResponse;
      return this.assignToDesignerResponse;
    });
  }

  // Client assigned to Team Lead
  assignToTeamLead(clientAssignData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    };
    const body = JSON.stringify(clientAssignData);
    console.log('body', body);
    return this.http.post(this.env.backendURL + '/v1/admin/admin-assignTo-tl', body, httpOptions)
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

export interface DelayedProposalsApiResponse {
  success: boolean,
  data: DelayedProposalsData[];
}

export interface PaymentDueApiResponse {
  success: boolean,
  data: PaymentDueData[];
}

export interface NewSignUpsApiResponse {
  success: boolean,
  data: NewSignUpsData[];
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
