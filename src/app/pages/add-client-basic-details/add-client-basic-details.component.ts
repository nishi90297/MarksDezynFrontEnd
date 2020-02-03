import { Component, OnInit } from '@angular/core';
import { AddClientServiceService } from 'app/Services/add-client-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-client-basic-details',
  templateUrl: './add-client-basic-details.component.html',
  styleUrls: ['./add-client-basic-details.component.scss']
})
export class AddClientBasicDetailsComponent implements OnInit {

  constructor(private addClientServiceService:AddClientServiceService, private router: Router) { }

  ngOnInit() {
  }

  submitAddClientForm(form: NgForm){
    console.log(form.value)
  }
}