import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { Company } from '../models/company';
import { AuthenticationService } from './authentication.service';
import { apiEndpoint, companyApiBaseUrl } from '../common/constant';
import { CompanyResponse } from '../models/companyResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  private companyList!: Company[];

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
      exchange: [companyDetails.companyStockExchange],
    };
    return this.httpClient.post<number>(apiUrl, JSON.stringify(companyRequest), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error.statusText);
      throw new Error(error.error);
    }));
  }

  get(): Observable<Company[] | undefined> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    const apiUrl = companyApiBaseUrl + apiEndpoint.getAllCompanyEndpoint;
    const companyResponse = this.httpClient.get<CompanyResponse[]>(apiUrl).
      pipe(map(
        (companyDetails: CompanyResponse[]) => {
          return this.getAllCompanyDetails(companyDetails)
        }), catchError((error: HttpErrorResponse) => {
          console.log(error.statusText);
          throw new Error(error.error);
        }));
    return companyResponse;
  }

  getById(companyCode: string): Observable<Company | undefined> {
    // add token into header
    var token = this.authenticationService.getBearerToken();
    companyCode = companyCode.toUpperCase();
    const apiUrl = companyApiBaseUrl + apiEndpoint.getCompanyEndpoint + "/" + companyCode;
    const companyResponse = this.httpClient.get<CompanyResponse>(apiUrl).
      pipe(map(
        (companyDetails: CompanyResponse) => {
          return this.getCompanyDetails(companyDetails);
        }), catchError((error: HttpErrorResponse) => {
          console.log(error.statusText);
          throw new Error(error.error);
        }));
    return companyResponse;
  }

  delete(companyCode: string): Observable<number> {
    const apiUrl = companyApiBaseUrl + apiEndpoint.deleteCompanyEndpoint + "/" + companyCode;
    return this.httpClient.delete<number>(apiUrl).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error.statusText);
      throw new Error(error.error);
    }));
  }

  private getAllCompanyDetails(companyDetails: CompanyResponse[]): Company[] | undefined {
    if (companyDetails) {
      this.companyList = [];
      companyDetails.forEach(element => {
        this.companyList.push(new Company(
          element.code,
          element.name,
          element.ceoName,
          element.turnOver,
          element.website,
          element.exchange[0]
        ));
      });
    }
    return this.companyList;
  }

  private getCompanyDetails(companyDetails: CompanyResponse): Company | undefined {
    var company = undefined;
    if (companyDetails) {
      company = new Company(
        companyDetails.code,
        companyDetails.name,
        companyDetails.ceoName,
        companyDetails.turnOver,
        companyDetails.website,
        companyDetails.exchange[0])
    }
    return company;
  }
}
