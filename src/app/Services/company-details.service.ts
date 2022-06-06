import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company';
import { AuthenticationService } from './authentication.service';
import companyList from '../test-data/db.json';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  post(companyDetails: Company): Observable<number> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    return of(0);
  }

  get(): Observable<Company[]> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    var data = companyList;
    return of(data);
  }

  getById(companyCode: string): Observable<Company | undefined> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    companyCode = companyCode.toUpperCase();
    var data = companyList as Company[];
    data = data.filter(x => x.companyCode === companyCode);
    return of(data[0]);
  }

  delete(companyCode: string): Observable<number> {
    // 
    return of()
  }
}
