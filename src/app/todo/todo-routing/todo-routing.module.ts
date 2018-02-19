// ./angular-client/src/app/todo/todo-routing/todo-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { OrdenestrabajosComponent } from '../../ordenestrabajos/ordenestrabajos.component';
import { OrdendetallesComponent } from '../../ordendetalles/ordendetalles.component';
import { ProyectistasComponent } from '../../proyectistas/proyectistas.component';
import { AdminproyectistasComponent } from '../../adminproyectistas/adminproyectistas.component';
import { ListaordenesComponent } from '../../listaordenes/listaordenes.component';


const todoRoutes: Routes = [
  { path:'todos', component:TodoListComponent },
  { path:'todo/:id', component:TodoDetailComponent },
  { path:'ordenestrabajos', component:OrdenestrabajosComponent },
  { path:'ordenestrabajos/:id', component:OrdendetallesComponent },
  { path:'listaordenes', component:ListaordenesComponent },
  { path:'proyectistas', component:ProyectistasComponent },
  { path:'adminproyectistas', component:AdminproyectistasComponent },
  { path:'listaordenes', component:ListaordenesComponent },
  
]

@NgModule({
  imports: [
    RouterModule.forChild(todoRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class TodoRoutingModule { }
