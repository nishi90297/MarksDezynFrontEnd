import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AdminRegisterResponse, LoginServiceService, UserLogin} from 'app/Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: UserLogin;
  errorMsg: string;
  status: string;
  response: AdminRegisterResponse;

  constructor(private loginService: LoginServiceService, private router: Router) { }
  ngOnInit() {
    this.loginService.logout();
  }

  submitLoginForm(form: NgForm) {
    this.user = { EmailId: form.value.email, UserPassword: form.value.password };
    this.loginService.validateUserCredentialsInAPI(this.user).subscribe(
      responseStatus => { responseStatus as AdminRegisterResponse;
        this.response=responseStatus;
        this.router.navigate(['/']);
      },
      resError => {
        // console.log( 'yaha', resError);
        alert('Wrong username or passoword !')
        this.errorMsg = resError.message
      },
      // () => console.log('Response Received')
    );
  }
}
