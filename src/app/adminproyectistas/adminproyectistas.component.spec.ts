import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproyectistasComponent } from './adminproyectistas.component';

describe('AdminproyectistasComponent', () => {
  let component: AdminproyectistasComponent;
  let fixture: ComponentFixture<AdminproyectistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproyectistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproyectistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
