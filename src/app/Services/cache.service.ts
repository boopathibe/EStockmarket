import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private bearerToken!: string;
  private loginModel: LoginModel | undefined;
  
  constructor() { }

  setBearerToken(token: string) {
    this.bearerToken = token;
  }

  getBearerToken(): string {
    return this.bearerToken
  }

  setLoggedInUser(loginModel: LoginModel) {
    this.loginModel = loginModel;
  }

  getLoggedInUser(): LoginModel | undefined {
    return this.loginModel;
  }

  clear() {
    this.bearerToken = "";
    this.loginModel = undefined;
  }
}
