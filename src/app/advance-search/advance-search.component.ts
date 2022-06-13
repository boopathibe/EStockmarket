import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanySearchDetail } from '../models/company-search-detail';
import { StockDetails } from '../models/stock';
import { CompanyDetailsService } from '../Services/company-details.service';
import { StockDetailsService } from '../Services/stock-details.service';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  companyList!: Company[];
  stockList?: StockDetails[];
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
        (companyList: Company[] | undefined) => {
          if (companyList !== undefined && companyList.length > 0) {
            this.companyList = companyList;
            return;
          }
          this.errorMessage = 'No company registered yet!!';
        });  
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
            this.stockList = searchDetail.stocks;
            this.minStockPrice = searchDetail.minPrice;
            this.maxStockPrice = searchDetail.maxPrice;
            this.avgStockPrice = searchDetail.avgPrice;
          } else {
            this.errorMessage = "Data not found";
          }
        });      
    }
  }
}
