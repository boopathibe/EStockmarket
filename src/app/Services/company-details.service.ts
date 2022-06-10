import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
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
      Code: companyDetails.companyCode,
      Name: companyDetails.companyName,
      CeoName: companyDetails.companyCeoName,
      TurnOver: companyDetails.companyTurnover as number,
      Website: companyDetails.companyWebsite,
      Exchange: companyDetails.companyStockExchange,
    };
    return this.httpClient.post<number>(apiUrl, JSON.stringify(companyRequest)).pipe();
  }

  get(): Observable<Company[]> {
    // add token into header
    var token = this.authenticationService.getBearerToken();

    var companyList: Company[];
    const apiUrl = companyApiBaseUrl + apiEndpoint.getAllCompanyEndpoint;

    const ss = this.httpClient.get<CompanyResponse[]>(apiUrl).
      pipe(map(
        (companyDetails: CompanyResponse[]) => {
          return this.test(companyDetails)
        }));
        return ss;
  }

  private test(companyDetails: CompanyResponse[]): Company[] {
    var companyList: Company[] = [];
    if (companyDetails) {
      companyList.push(new Company(
        companyDetails[0].code,
        companyDetails[0].name,
        companyDetails[0].ceoName,
        companyDetails[0].turnOver,
        companyDetails[0].website,
        companyDetails[0].exchange[0]
      ));
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

  delete(companyCode: string): Observable<number> {
    // 
    // test
    return of()
  }
}
