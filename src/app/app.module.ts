// ./angular-client/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home.component';

import { AppRoutingModule } from './app-routing.module';
import { TodoRoutingModule } from './todo/todo-routing/todo-routing.module';
import { TodoService } from './todo/todo.service';
import { ProyService } from './todo/proy.service';
import { IntegrantesService } from './services/integrantes.service';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { BookFilterPipe } from './pipes/ot-filtro-pipe';
import { OtEditaComponent } from './ot-edita/ot-edita.component';
import { OrdenestrabajosComponent } from './ordenestrabajos/ordenestrabajos.component';
import { AngularMultiSelectModule } from '../../node_modules/angular2-multiselect-checkbox/src/app/angular2-multiselect-dropdown/multiselect.component';
import { ProyectistasComponent } from './proyectistas/proyectistas.component';
import {MyDatePickerModule} from '../../node_modules/angular4-datepicker/src/my-date-picker/my-date-picker.module';
import { AdminproyectistasComponent } from './adminproyectistas/adminproyectistas.component';
import { ListaordenesComponent } from './listaordenes/listaordenes.component';
import { OrdendetallesComponent } from './ordendetalles/ordendetalles.component';
import { NavegadorComponent } from './navegador/navegador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodoListComponent,
    BookFilterPipe,
    TodoDetailComponent,
    OtEditaComponent,
    OrdenestrabajosComponent,
    ProyectistasComponent,
    AdminproyectistasComponent,
    ListaordenesComponent,
    OrdendetallesComponent,
    NavegadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
    MyDatePickerModule
  ],
  providers: [ TodoService,ProyService,IntegrantesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
