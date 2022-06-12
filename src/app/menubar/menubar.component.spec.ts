import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarComponent } from './menubar.component';

xdescribe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenubarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
