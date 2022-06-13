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
  successMessage?: string;

  constructor(private companyDetailsService: CompanyDetailsService) { }

  ngOnInit(): void {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    this.getCompanyDetailLists();
  }

  getCompanyDetailLists() {
    this.companyDetailsService.get().
      subscribe((companyList: Company[] | undefined) => {
        if (companyList !== undefined && companyList.length > 0) {
          this.companyList = companyList;
          return;
        }
        this.errorMessage = "No company registered yet!!";
        return;
      });
  }

  deleteCompany(companyDetail: Company) {
    const companyCode = companyDetail.companyCode || "";
    this.companyDetailsService.delete(companyCode).
      subscribe((response: number) => {
        if (response === 200) {
          this.successMessage = "Company and stock details is deleted successfully!!.";
          setTimeout(() => {
            this.getCompanyDetailLists();
            this.successMessage = undefined;
          }, 900);
          return;
        }
        this.errorMessage = "Error occurred in the delete operation.please try again!!!.";
        setTimeout(() => {
          this.getCompanyDetailLists();
          this.errorMessage = undefined;
        }, 1000);
      });
  }
}
