import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectistasComponent } from './proyectistas.component';

describe('ProyectistasComponent', () => {
  let component: ProyectistasComponent;
  let fixture: ComponentFixture<ProyectistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
