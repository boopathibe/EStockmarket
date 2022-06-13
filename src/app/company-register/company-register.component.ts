import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyDetailsService } from '../Services/company-details.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  companyRegisterForm!: FormGroup;
  companyStockExchangeList!: string[];
  errorMessage?: string;
  successMessage?: string;
  submitted?: boolean;

  constructor(private form: FormBuilder, private companyDetailsService: CompanyDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.companyRegisterForm = this.form.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyCeoName: ['', Validators.required],
      companyTurnover: ['', Validators.required],
      companyWebsite: ['', Validators.required],
      companyStockExchange: ['', Validators.required]
    });
    this.companyStockExchangeList = ['NSE', 'BSE'];
    this.successMessage = undefined;
    this.errorMessage = undefined;
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.companyRegisterForm.controls;
  }

  registerCompany() {
    if (this.companyRegisterForm.invalid) {
      this.submitted = true;
      return;
    }
    const data = this.companyRegisterForm.value as Company;
    this.submitted = false;
    this.companyDetailsService.post(data).
      subscribe((response: number) => {
        if (response === 201) {
          this.successMessage = "Company details added successfully";
          this.companyRegisterForm.reset();
          setTimeout(() => {            
            this.router.navigate(["/companyList"]);
          }, 1000);
          return;          
        }
        this.errorMessage = "Error occurred";
      });
  }
}
