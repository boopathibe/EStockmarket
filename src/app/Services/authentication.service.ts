import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { HttpClient } from '@angular/common/http'
import { UserDetail } from '../models/user-detail';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpclient: HttpClient, private cacheService: CacheService, private router: Router) { }

  login(userDetail: UserDetail): Observable<string> {
    // add api authentication logic
    return of("token");
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

  setLoggedInUser(userDetail: UserDetail) {
    this.cacheService.setLoggedInUser(userDetail);
  }

  getLoggedInUser(): UserDetail | undefined {
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
