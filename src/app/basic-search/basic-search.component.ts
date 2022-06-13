import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { CompanyDetailsService } from '../Services/company-details.service';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent implements OnInit {

  companyDetail?: Company;
  companyCode?: string;
  errorMessage?: string;
  submitted?: boolean;
  successMessage?: string;

  constructor(private companyDetailsService: CompanyDetailsService) { }

  ngOnInit(): void {
  }

  basicSearch() {
    this.companyDetail = undefined;
    this.errorMessage = undefined;
    this.successMessage = undefined;
    if (this.companyCode !== undefined && this.companyCode !== "") {
      this.submitted = false;
      this.companyDetailsService.getById(this.companyCode).
        subscribe((company: Company | undefined) => {
          if (company !== undefined) {
            this.companyDetail = company;
            return;
          }
          this.errorMessage = "Data not found";
          return;
        });
    } else {
      this.submitted = true;
    }
  }

  deleteCompany(companyDetail: Company) {
    const companyCode = companyDetail.companyCode || "";
    this.companyDetailsService.delete(companyCode).
      subscribe((response: number) => {
        if (response === 200) {
          this.successMessage = "Company and stock details is deleted successfully!!.";
          return;
        } else if (response === 404) {
          this.errorMessage = "Data not found for the company" + companyCode + "!!!.";
          return;
        }
        this.errorMessage = "Error occurred in the delete operation.please try again!!!.";
      });
  }
}
