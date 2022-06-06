import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanySearchDetail } from '../models/company-search-detail';
import { AuthenticationService } from './authentication.service';
import companystock from '../test-data/company-stock.json';

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getById(companyCode: string, startDate: Date, endDate: Date): Observable<CompanySearchDetail> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    var data = companystock;
    data = data.filter(x => x.companyName === companyCode);
    return of(data[0]);
  }

  add(companyCode: string, stockPrice: number): Observable<number> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    return of();
  }
}
