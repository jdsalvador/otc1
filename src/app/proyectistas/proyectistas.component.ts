import { Component, OnInit } from '@angular/core';
import { IntegrantesService } from '../services/integrantes.service';
import { TodoService } from '../todo/todo.service';
//import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
//import { of }         from 'rxjs/observable/of';
//import {} from '@angular/material'
//import {
 //  debounceTime, distinctUntilChanged, switchMap
// } from 'rxjs/operators';
import * as io from "socket.io-client";
import 'rxjs/add/operator/finally';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-proyectistas',
  templateUrl: './proyectistas.component.html',
  styleUrls: ['./proyectistas.component.css']
})
@Pipe({
    name: 'bookfilter',
    pure: false
})
export class ProyectistasComponent implements OnInit  {

private searchTerms = new Subject<string>();


  todos:any[] = [];
  integrantes:any[] = [];
  integrante:any = {};
  ordenes:any[] = [];
  todoToEdit:any = {};
  todoToDelete:any = {};
  todoToAsigna:any = {};
  fetchingData:boolean = false;
  apiMessage:string;
  seccion:string=''
  heroes$: any = {};
  selectedHero: any = {};
  proyecs:any[] = [];
  userToEdit:any={};
  usuario:string;
  //private url = 'http://localhost:3001';
  private url = 'http://192.168.10.31:3001';
  //private socket;
  private socket;
  constructor(private integrantesService:IntegrantesService, private otService: TodoService) { }

 filterargs = {cargo: 'proyectista'};

 estadoorden=['Iniciada','Pausada','Cerrada'];


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    //     this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.integrantesService.getTodo(term)),
    // );


    this.integrantesService.showAddTodoBox = true;
    this.integrantesService.getTodos()
                    .then(td => this.integrantes = td.todos )
    this.otService.getTodos()
                    .then(td => this.ordenes = td.todos )

                        this.socket = io.connect(this.url);
  }



  AddTodo(todo:any):void{
    if(!todo){ return; }
    this.integrantesService.createTodo(todo)
                    .then(td => {
                      console.log(td);
                      this.integrantes.push(td.todo);
                    })
  }
  muestraUsuario(user:any):void{
    this.userToEdit = user;
    this.apiMessage = "";
  }

  
  showEditTodo(todo:any):void{
    this.todoToEdit = todo;
    //this.usuario=usuario;
    //console.log(usuario);
    this.apiMessage = "";
  }

  EditTodo(todo:any,p:any):void{
    if(!todo){ return; }
    todo.id = this.todoToEdit._id;
    var listaestado=[];
           console.log("cambio")
          console.log(p)
          console.log(this.userToEdit.clave)
          console.log(todo.listaproyectista.length)
          console.log(todo.listaproyectista[1])
          console.log(todo.listaproyectista[1]==this.userToEdit.clave)
   
      console.log("Largo")
      for(var i=0;i<todo.listaproyectista.length;i++){
        if(todo.listaproyectista[i]==this.userToEdit.clave){
          //todo.estado[i][1]==todo.estado
          todo.listaestadoalter[i]=todo.estado;
          console.log("cambio1")
        }
      }
    

    console.log(todo.listaestadoalter[0])
    //todo.listaestadoalter=listaestado
    this.otService.updateTodo(todo,this.socket)
                    // .then(td => {
                    //   const updatedTodos = this.ordenes.map(t => {
                    //     if(td.todo._id !== t._id){
                    //       return t;
                    //     }
                    //     return { ...t, ...td.todo };
                    //   })
                    //   this.apiMessage = td.message;
                    //   this.ordenes = updatedTodos;
                    // })
  }

 showDeleteTodo(todo:any):void{
   this.todoToDelete = todo;
   this.apiMessage = "";
 }

 DeleteTodo(todo:any):void{
   if(!todo){ return; }
   this.integrantesService.deleteTodo(todo)
                   .then(td => {
                     const filteredTodos = this.integrantes.filter(t => t._id !== td.todo._id);
                     this.apiMessage = td.message;
                     this.integrantes = filteredTodos;
                   })
 }

  showAsignaTodo(todo:any):void{
   this.todoToAsigna = todo;
   this.apiMessage = "";
 }

 AsignaTodo(todo:any):void{
    if(!todo){ return; }
    todo.id = this.todoToAsigna._id;
    this.integrantesService.updateTodo(todo)
                    .then(td => {
                      const updatedTodos = this.integrantes.map(t => {
                        if(td.todo._id !== t._id){
                          return t;
                        }
                        return { ...t, ...td.todo };
                      })
                      this.apiMessage = td.message;
                      this.integrantes = updatedTodos;
                    })
  }

 // class method for toggling  AddTodoBox in todo-list.component.html
  showAddTodoBox(e):void{
    e.preventDefault();
    this.integrantesService.showAddTodoBox = !this.integrantesService.showAddTodoBox;
  }


}
