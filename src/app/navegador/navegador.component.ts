import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {
@Input()  listapantalla:boolean;
@Input()  listaing:boolean;
@Input()  listaproyec:boolean;
@Input()  listaadminproyec:boolean;
  constructor() { }

  ngOnInit() {
  }

}
