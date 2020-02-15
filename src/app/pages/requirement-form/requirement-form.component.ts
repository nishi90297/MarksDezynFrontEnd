import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  submitRequirementForm(form: NgForm) {
    // this.user = { EmailId: form.value.email, UserPassword: form.value.password };
    // this.loginService.validateUserCredentialsInAPI(this.user).subscribe(
    //   responseStatus => {
    //     this.router.navigate(['/']);
    //   },
    //   resError => {
    //     // console.log( 'yaha', resError);
    //     alert("Wrong username or passoword !")
    //     this.errorMsg = resError.message
    //   },
    //   // () => console.log('Response Received')
    // );
  }
}
