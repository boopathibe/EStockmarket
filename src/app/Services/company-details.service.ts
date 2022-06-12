import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { Company } from '../models/company';
import { AuthenticationService } from './authentication.service';
import companyList from '../test-data/db.json';
import { apiEndpoint, companyApiBaseUrl } from '../common/constant';
import { CompanyResponse } from '../models/companyResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  post(companyDetails: Company): Observable<number> {
    // add token into header
    var token = this.authenticationService.getBearerToken();

    const apiUrl = companyApiBaseUrl + apiEndpoint.addCompanyEndpoint;
    const companyRequest = {
      code: companyDetails.companyCode,
      name: companyDetails.companyName,
      ceoName: companyDetails.companyCeoName,
      turnOver: companyDetails.companyTurnover as number,
      website: companyDetails.companyWebsite,
      exchange: companyDetails.companyStockExchange,
    };
    return this.httpClient.post<number>(apiUrl, companyRequest, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe()
};

  get(): Observable<Company[]> {
    // add token into header
    var token = this.authenticationService.getBearerToken();

    var companyList: Company[];
    const apiUrl = companyApiBaseUrl + apiEndpoint.getAllCompanyEndpoint;

    const companyResponse = this.httpClient.get<CompanyResponse[]>(apiUrl).
      pipe(map(
        (companyDetails: CompanyResponse[]) => {
          return this.getCompanyDetails(companyDetails)
        }));
        return companyResponse;
  }

  private getCompanyDetails(companyDetails: CompanyResponse[]): Company[] {
    var companyList: Company[] = [];
    if (companyDetails) {
      companyDetails.forEach(element => {
        companyList.push(new Company(
            element.code,
            element.name,
            element.ceoName,
            element.turnOver,
            element.website,
            element.exchange[0]
          ));
      });
    }
    return companyList;
  }

  getById(companyCode: string): Observable<Company | undefined> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    companyCode = companyCode.toUpperCase();
    var data = companyList as Company[];
    data = data.filter(x => x.companyCode === companyCode);
    return of(data[0]);
  }

  delete(companyCode: string): any {
    const apiUrl = companyApiBaseUrl + apiEndpoint.deleteCompanyEndpoint;
    const ss = apiUrl+"/"+companyCode;
    this.httpClient.delete(ss).subscribe(data => {
      console.log("service" + data);
    });
  }
}
