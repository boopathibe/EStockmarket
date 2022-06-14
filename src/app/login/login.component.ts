import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/auth-response-model';
import { LoginModel } from '../models/login-model';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  credentials: LoginModel = {userName:'', password:''};
  invalidLogin: boolean | undefined;
  errorMessage?: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.errorMessage = undefined;
    this.router.navigate(["/landing"]);
    const credentials = {
      'userName' :  this.loginForm.value.userName,
      'password' : this.loginForm.value.password
    }
    
    this.authenticationService.login(credentials)
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          this.authenticationService.setBearerToken(token);
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/landing"]);
        },
        error: ((error: HttpErrorResponse) => {
          this.invalidLogin = true
          console.log(error.statusText);
          this.errorMessage = error.statusText;
          throw new Error(error.error);
      })
    });
  }
}
