import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { TodoService } from '../todo/todo.service';

@Component({
  selector: 'app-ordendetalles',
  templateUrl: './ordendetalles.component.html',
  styleUrls: ['./ordendetalles.component.css']
})
export class OrdendetallesComponent implements OnInit {

 todo:any[]=[];
 seccion:string='';

  constructor(
    private todoService:TodoService,
    private route:ActivatedRoute,
    private location:Location
  ) { }
  ngOnInit():void {
    this.route.paramMap
        .switchMap((params:ParamMap) => this.todoService.getTodo(params.get('id')))
        .subscribe(td => this.todo =  td.todo[0])
  }

  goBack():void {
    this.location.back();
  }
}
