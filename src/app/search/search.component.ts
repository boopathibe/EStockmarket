import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanyDetailsService } from '../Services/company-details.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  companyDetail?: Company;
  companyCode?: string;
  errorMessage?: string;
  submitted?: boolean;

  constructor(private companyDetailsService: CompanyDetailsService) { }

  ngOnInit(): void {
  }

  companySearch() {
    this.companyDetail = undefined;
    this.errorMessage = undefined;
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
      // this.companyDetailsService.getById(this.companyCode).
      //   pipe(
      //     map((company: Company) => {
      //       if (company !== undefined) {
      //         this.companyDetail = company;
      //         return;
      //       }
      //       this.errorMessage = "No data Found";
      //       return;
      //     }));
    } else {
      this.submitted = true;
    }
  }

  deleteCompany(companyDetail: Company) {
    const companyCode = companyDetail.companyCode || "";
    this.companyDetailsService.delete(companyCode).
      subscribe((res) => {

      });
  }
}
