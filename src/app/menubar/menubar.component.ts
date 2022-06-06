import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  routeToLanding() {
    this.router.navigate(['/landing']);
  }

  routeToAllRecords() {
    this.router.navigate(['/companyList']);
  }

  routeToAddCompany() {
    this.router.navigate(['/companyRegister']);
  }

  routeToBasicSearch() {
    this.router.navigate(['/search']);
  }

  routeToAdvanceSearch() {
    this.router.navigate(['/advanceSearch']);
  }

  routeToAddStock(){
    this.router.navigate(['/addStock']);
  }

  logout() {
    this.authenticationService.logout();
  }

}
