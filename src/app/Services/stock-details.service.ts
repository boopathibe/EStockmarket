import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompanySearchDetail } from '../models/company-search-detail';
import { AuthenticationService } from './authentication.service';
import { apiEndpoint, stockApiBaseUrl } from '../common/constant';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService, private datePipe: DatePipe) { }

  getById(companyCode: string, startDate: Date, endDate: Date): Observable<CompanySearchDetail> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    companyCode = companyCode.toUpperCase();
    // yyyy-mm-dd
    const sDate = this.datePipe.transform(startDate, "yyyy-MM-dd");
    const eDate = this.datePipe.transform(endDate, "yyyy-MM-dd");
    const apiUrl = stockApiBaseUrl + apiEndpoint.getCompanyStockEndpoint + "/" + companyCode + "/" + startDate + "/" + endDate;
    const companySearchDetailResponse = this.httpClient.get<CompanySearchDetail>(apiUrl).
      pipe(map(
        (companyDetails: CompanySearchDetail) => {
          return this.getCompanyStockDetails(companyDetails, companyCode);
        }));
    return companySearchDetailResponse;
  }

  add(companyCode: string, stockPrice: number): Observable<number> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    const apiUrl = stockApiBaseUrl + apiEndpoint.addCompanyStockEndpoint;
    const stockRequest = {
      companyCode: companyCode,
      stockPrice: stockPrice
    };
    return this.httpClient.post<number>(apiUrl, JSON.stringify(stockRequest), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe();
  }

  private getCompanyStockDetails(companyDetail: CompanySearchDetail, companyCode: string): CompanySearchDetail {
    var companySearchDetail: CompanySearchDetail = {};
    if (companyDetail) {
      companySearchDetail = new CompanySearchDetail(companyCode,
        companyDetail.stocks,
        companyDetail.maxPrice,
        companyDetail.minPrice,
        companyDetail.avgPrice);
    }
    return companySearchDetail;
  }
}
