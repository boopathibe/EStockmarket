import { Injectable } from '@angular/core';
import { UserDetail } from '../models/user-detail';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private bearerToken!: string;
  private userDetail: UserDetail | undefined;
  
  constructor() { }

  setBearerToken(token: string) {
    this.bearerToken = token;
  }

  getBearerToken(): string {
    return this.bearerToken
  }

  setLoggedInUser(userDetail: UserDetail) {
    this.userDetail = userDetail;
  }

  getLoggedInUser(): UserDetail | undefined {
    return this.userDetail;
  }

  clear() {
    this.bearerToken = "";
    this.userDetail = undefined;
  }
}
