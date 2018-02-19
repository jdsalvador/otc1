import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdendetallesComponent } from './ordendetalles.component';

describe('OrdendetallesComponent', () => {
  let component: OrdendetallesComponent;
  let fixture: ComponentFixture<OrdendetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdendetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdendetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
