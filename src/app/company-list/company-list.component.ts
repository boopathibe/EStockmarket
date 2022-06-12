import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Company } from '../models/company';
import { CompanyDetailsService } from '../Services/company-details.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyList!: Company[];
  errorMessage?: string;

  constructor(private companyDetailsService: CompanyDetailsService) { }

  ngOnInit(): void {
    this.getCompanyDetailLists();
  }

  getCompanyDetailLists() {
    this.companyDetailsService.get().
      subscribe((companyList: Company[]) => {
        if (companyList !== undefined) {
          this.companyList = companyList;
          return;
        }
        this.errorMessage = "No Company registered yet!!";
        return;
      });
  }

  deleteCompany(companyDetail: Company) {
    const companyCode = companyDetail.companyCode || "";
    this.companyDetailsService.delete(companyCode).
      subscribe((res: any) => {
        console.log(res);
      });
  }
}
