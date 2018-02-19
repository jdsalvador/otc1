import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaordenesComponent } from './listaordenes.component';

describe('ListaordenesComponent', () => {
  let component: ListaordenesComponent;
  let fixture: ComponentFixture<ListaordenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaordenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaordenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
