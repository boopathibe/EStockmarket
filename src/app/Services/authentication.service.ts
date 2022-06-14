import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticatedResponse } from '../models/auth-response-model';
import { apiEndpoint, authApiBaseUrl } from '../common/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private cacheService: CacheService, private router: Router) { }

  login(loginModel: LoginModel): Observable<AuthenticatedResponse> {
    const apiUrl = authApiBaseUrl + apiEndpoint.authEndpoint;  
      return this.httpClient.post<AuthenticatedResponse>(apiUrl, loginModel, {
        headers: new HttpHeaders({ 
          "Content-Type": "application/json"
        })
      }).pipe()    
  }

  logout() {
    this.cacheService.clear();
    this.router.navigate(['/login']);
  }

  setBearerToken(token: string) {
    this.cacheService.setBearerToken(token);
  }

  getBearerToken(): string {
    return this.cacheService.getBearerToken();
  }

  setLoggedInUser(loginModel: LoginModel) {
    this.cacheService.setLoggedInUser(loginModel);
  }

  getLoggedInUser(): LoginModel | undefined {
    return this.cacheService.getLoggedInUser();
  }

  isLoggedIn() {
    let authToken = this.getBearerToken();
    if (authToken === " " || authToken === undefined) {
      return false;
    }
    else {
      return true;
    }
  }
}
