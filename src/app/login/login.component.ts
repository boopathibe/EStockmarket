import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetail } from '../models/user-detail';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.router.navigate(["/landing"]);
    const user = new UserDetail();
    user.userId = this.loginForm.value.userId;
    user.password = this.loginForm.value.password;

    // add login api call here 

    // this.authenticationService.login(user)
    //   .subscribe((data: any) => {
    //     //console.log(data);
    //     this.authenticationService.setBearerToken(data.token);
    //     this.router.navigate(["/landing"]);
    //   });
  }
}
