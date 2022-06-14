import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted?: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  login() {
    if (this.loginForm.invalid) {
      this.submitted = true;      
      this.errorMessage = undefined;
      return;
    }
    this.errorMessage = undefined;
    this.submitted = false;
    this.router.navigate(["/landing"]);
    const credentials = {
      'userName' :  this.loginForm.value.userName,
      'password' : this.loginForm.value.password
    }
    
    this.authenticationService.login(credentials).
        subscribe((response: AuthenticatedResponse) => {
          if (response.statusCode === 200) {
            this.authenticationService.setBearerToken(response.token);
            this.invalidLogin = false; 
            this.router.navigate(["/landing"]);
            return;
          } else if (response.statusCode === 401) {
            this.errorMessage = "Invalid user details";
            return;
          }
          this.errorMessage = "Error occurred";
        });
  }
}
