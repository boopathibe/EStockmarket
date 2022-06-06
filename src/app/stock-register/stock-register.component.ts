import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyDetailsService } from '../Services/company-details.service';
import { StockDetailsService } from '../Services/stock-details.service';

@Component({
  selector: 'app-stock-register',
  templateUrl: './stock-register.component.html',
  styleUrls: ['./stock-register.component.css']
})
export class StockRegisterComponent implements OnInit {

  addCompanyStockForm!: FormGroup;
  submitted?: boolean;
  companyName?: string;
  companyList!: Company[];
  errorMessage?: string;

  constructor(private companyDetailsService: CompanyDetailsService, private stockDetailsService: StockDetailsService,
    private form: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.addCompanyStockForm = this.form.group({
      companyCode: ["", Validators.required],
      stockValue: ["", Validators.required, Validators.pattern("^[0-9]*$")]
    });

    this.companyDetailsService.get().
      subscribe(
        (companyList: Company[]) => {
          if (companyList !== undefined && companyList.length > 0) {
            this.companyList = companyList;
            return;
          }
          this.errorMessage = 'No data Found';
        });

    // this.companyDetailsService.get().
    //   pipe(
    //     map((companyList: Company[]) => {
    //       if (companyList !== undefined && companyList.length > 0) {
    //         this.companyList = companyList;
    //         return;
    //       }
    //       this.errorMessage = 'No data Found';
    //     }));
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.addCompanyStockForm.controls;
  }

  addStock() {
    this.errorMessage = '';
    if (this.addCompanyStockForm.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    const stock = this.addCompanyStockForm.value.stockValue;
    const companyCode = this.addCompanyStockForm.value.companyCode;
    this.stockDetailsService.add(companyCode, stock).
      subscribe((res) => {
        if (res) {
          this.router.navigate(['/advanceSearch']);
        }
        this.errorMessage = "Stock not added.please try again later";
      });

  }
}
