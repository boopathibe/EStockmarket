import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';
import { CompanyResponse } from '../models/companyResponse';
import { CompanyDetailsService } from '../Services/company-details.service';
import { BasicSearchComponent } from './basic-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BasicSearchComponent', () => {
  let component: BasicSearchComponent;
  let fixture: ComponentFixture<BasicSearchComponent>;
  let mockCompanyDetailsService: CompanyDetailsService;
  let companyDetails: CompanyResponse;
  let exchangeList: string[] = ['NSE', 'BSE'];
  let companyResponse: CompanyResponse[] = [];

  beforeEach(() => async () => {
    await TestBed.configureTestingModule({      
      declarations: [ BasicSearchComponent ],
      providers: [
        { provide: CompanyDetailsService, useValue: mockCompanyDetailsService }
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        HttpClient
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    companyDetails = {      
      code: "CTSUK",
      name: "Cognizant UK",
      ceoName: "Brian",
      turnOver:  100000000,
      website: "www.cognizant.com",
      exchange: exchangeList
    }

    companyResponse.push(companyDetails);
    
    mockCompanyDetailsService = jasmine.createSpyObj("CompanyDetailsService", ["getById"]);
    (mockCompanyDetailsService.getById as jasmine.Spy).and.callFake((companyCode: string) => {
      return observableOf(companyResponse);
    });
   component = new BasicSearchComponent(mockCompanyDetailsService);
  });
  
  describe("instance should be created without error", () => {
    it('should call the service as expected', () => {
      fixture = TestBed.createComponent(BasicSearchComponent);
      expect(fixture.componentInstance).toBeDefined();
    });
   });

  // xdescribe("Service call implementation", () => {
  //   it('should call the service as expected', () => {
  //     // Act
  //     component.basicSearch();

  //     // Assert
  //     expect
  //   });
  // });
});