import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanySearchDetail } from '../models/company-search-detail';
import { Stock } from '../models/stock';
import { CompanyDetailsService } from '../Services/company-details.service';
import { StockDetailsService } from '../Services/stock-details.service';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  companyList!: Company[];
  stockList?: Stock[];
  companySearchDetail!: CompanySearchDetail;
  errorMessage?: string;
  minStockPrice?: number;
  maxStockPrice?: number;
  avgStockPrice?: number;
  maxDate?: string;
  advanceCompanySearch!: FormGroup;
  submitted?: boolean;
  companyName?: string;

  constructor(private companyDetailsService: CompanyDetailsService, private stockDetailsService: StockDetailsService,
    private form: FormBuilder, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.maxDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd') || undefined;
    this.advanceCompanySearch = this.form.group({
      companyCode: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required]
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
    return this.advanceCompanySearch.controls;
  }

  search() {
    this.errorMessage = '';
    if (this.advanceCompanySearch.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    const companyCode = this.advanceCompanySearch.value.companyCode;
    const startDate = this.advanceCompanySearch.value.startDate;
    const endDate = this.advanceCompanySearch.value.endDate;

    if (!companyCode || !startDate || !endDate) {
      this.errorMessage = 'All the 3 fields are mandatory for search..';
    } else if (startDate === endDate) {
      this.errorMessage = 'Start date & end date can not be same..';
    }
    else if (startDate > endDate) {
      this.errorMessage = 'Start date must be before end date..';
    }
    else {
      this.stockDetailsService.getById(companyCode, startDate, endDate).
        subscribe((searchDetail: CompanySearchDetail) => {
          if (searchDetail !== undefined) {
            this.companySearchDetail = searchDetail;
            this.companyName = searchDetail.companyName;
            this.stockList = searchDetail.stockList;
            this.minStockPrice = searchDetail.minStockPrice;
            this.maxStockPrice = searchDetail.maxStockPrice;
            this.avgStockPrice = searchDetail.avgStockPrice;
          } else {
            this.errorMessage = "Data not found";
          }
        });

      // this.stockDetailsService.getById(companyCode, startDate, endDate).
      //   pipe(map((companySearchDetail: CompanySearchDetail) => {
      //     if (companySearchDetail !== undefined) {
      //       this.companySearchDetail = companySearchDetail;
      //       this.stockList = companySearchDetail.stockList;
      //       this.minStockPrice = companySearchDetail.minStockPrice;
      //       this.maxStockPrice = companySearchDetail.maxStockPrice;
      //       this.avgStockPrice = companySearchDetail.avgStockPrice;
      //     } else {
      //       this.errorMessage = "errorMsg from advSearch response";
      //     }
      //   }));
    }
  }

}
