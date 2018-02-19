import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtEditaComponent } from './ot-edita.component';

describe('OtEditaComponent', () => {
  let component: OtEditaComponent;
  let fixture: ComponentFixture<OtEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
