import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoginServiceService, UserLogin } from 'app/Services/login-service.service';
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

  constructor(private loginService: LoginServiceService, private router: Router) { }

  submitLoginForm(form: NgForm) {
    event.preventDefault();
    this.user = { EmailId: form.value.email, UserPassword: form.value.password };
    console.log(form.value.email)
    this.loginService.validateUserCredentialsInAPI(this.user).subscribe(
      responseStatus => {
        console.log('response Status ________________>>>>>>' , responseStatus);
        /*this.status = responseStatus;
        if (this.status.toLowerCase() != "invalid credentials") {
          sessionStorage.setItem('userName', form.value.email);
          sessionStorage.setItem('userRole', this.status);
          sessionStorage.setItem('access_token', responseStatus.access_token)
          this.router.navigate(['/dashboard']);
        }
        else
        {
          this.errorMsg = this.status + ". Please provide valid credentials.";
        }*/
      },
      resError => this.errorMsg = resError,
      () => console.log("Response Received")
    );
    // this.router.navigate(['/dashboard']);
  }
}
