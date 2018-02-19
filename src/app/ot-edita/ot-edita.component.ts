import { Component, Input,OnInit } from '@angular/core';
import { TodoService } from '../todo/todo.service';
import { Book } from '../pipes/tipoorden';
import * as io from "socket.io-client";
@Component({
  selector: 'app-ot-edita',
  templateUrl: './ot-edita.component.html',
  styleUrls: ['../ordenestrabajos/ordenestrabajos.component.css']
})
export class OtEditaComponent implements OnInit {
 @Input() ordentrabajo:any;
@Input()  muestraedita:boolean;
  filter: Book = new Book();
todos:any[] = [];
todoToEdit:any = {};
apiMessage:string;
ordenedita:any={};
saludo:string="HOLA"
  todo:any = {};
  todoToDelete:any = {};
  fetchingData:boolean = false;
  //private url = 'http://localhost:3001';
  private url = 'http://192.168.10.31:3001';
  //private socket;
  private socket;
  constructor(private todoService:TodoService) { }

  ngOnInit() {
 this.todoService.showAddTodoBox = true;
    this.todoService.getTodos()
                    .then(td => this.todos = td.todos );
    this.socket = io.connect(this.url);
    // Receive Added Todo
    this.socket.on('TodoAdded', (data) => {
      console.log('TodoAdded: '+JSON.stringify(data));
      this.todos.unshift(data.todo);
    });
    //Receive Updated Todo
    this.socket.on('TodoUpdated', (data) => {
      console.log('TodoUpdated: '+JSON.stringify(data));
      const updatedTodos = this.todos.map(t => {
          if(data.todo._id !== t._id){
            return t;
          }
          return { ...t, ...data.todo };
        })
        this.apiMessage = data.message;
        this.todos = updatedTodos;
    });
    //Receive Deleted Todo and remove it from liste
    this.socket.on('TodoDeleted', (data) => {
      console.log('TodoDeleted: '+JSON.stringify(data));
      const filteredTodos = this.todos.filter(t => t._id !== data.todo._id);
      this.apiMessage = data.message;
      this.todos = filteredTodos;
    });
  }

 showEditTodo(todo:any):void{
    console.log("todo lista")
    console.log(todo)
    this.todoToEdit = todo;
    this.apiMessage = "";
  }

  EditTodo(todo:any):void{
    if(!todo){ return; }
    todo.id = this.todoToEdit._id;
    this.todoService.updateTodo(todo,this.socket);
  }

 showDeleteTodo(todo:any):void{
   this.todoToDelete = todo;
   this.apiMessage = "";
 }

 DeleteTodo(todo:any):void{
   if(!todo){ return; }
   this.todoService.deleteTodo(todo,this.socket);
 }
}
