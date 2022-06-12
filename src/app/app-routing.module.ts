import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { StockRegisterComponent } from './stock-register/stock-register.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "landing", component: LandingComponent },
  { path: "companyRegister", component: CompanyRegisterComponent },
  { path: "companyList", component: CompanyListComponent },
  { path: "advanceSearch", component: AdvanceSearchComponent },
  { path: "search", component: BasicSearchComponent },
  { path: "addStock", component: StockRegisterComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
