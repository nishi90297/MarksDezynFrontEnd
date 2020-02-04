import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {AdminRegisterResponse, LoginServiceService, UserLogin} from 'app/Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  user: UserLogin;
  errorMsg: string;
  status: string;
  response: AdminRegisterResponse;

  constructor(private loginService: LoginServiceService, private router: Router) { }

  submitLoginForm(form: NgForm) {
    this.user = { EmailId: form.value.email, UserPassword: form.value.password };
    this.loginService.validateUserCredentialsInAPI(this.user).subscribe(
      responseStatus => {
        this.response = responseStatus as AdminRegisterResponse
        // console.log('response Status data' , this.response);
        // console.log('response Status----------------->>>>>' , this.response.data.token);
        if(this.response.success){
          this.router.navigate(['/dashboard']);
        }
      },
      resError => {
        // console.log( 'yaha', resError);
        alert("Wrong username or passoword !")
        this.errorMsg = resError.message
      },
      // () => console.log('Response Received')
    );
  }
}
