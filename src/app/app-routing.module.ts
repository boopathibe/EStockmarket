import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { CanActivateRouteGuard } from './Services/can-activate-route.guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "landing", component: LandingComponent, canActivate: [CanActivateRouteGuard] },
  { path: "companyRegister", component: CompanyRegisterComponent, canActivate: [CanActivateRouteGuard] },
  { path: "companyList", component: CompanyListComponent, canActivate: [CanActivateRouteGuard]  },
  { path: "advanceSearch", component: AdvanceSearchComponent, canActivate: [CanActivateRouteGuard]  },
  { path: "search", component: BasicSearchComponent, canActivate: [CanActivateRouteGuard]  },
  { path: "addStock", component: StockRegisterComponent, canActivate: [CanActivateRouteGuard]  },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
