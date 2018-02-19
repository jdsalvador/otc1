import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenestrabajosComponent } from './ordenestrabajos.component';

describe('OrdenestrabajosComponent', () => {
  let component: OrdenestrabajosComponent;
  let fixture: ComponentFixture<OrdenestrabajosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenestrabajosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenestrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
