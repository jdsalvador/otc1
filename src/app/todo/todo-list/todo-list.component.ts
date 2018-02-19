// ./angular-client/src/app/todo/todo-list/todo-list.component.ts
import { Component,  Injectable,Input,OnInit,ViewChild, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../todo.service';
import { ProyService } from '../proy.service';
import { Book } from '../../pipes/tipoorden';
import * as io from "socket.io-client";
import {FormControl, FormGroup, FormArray } from '@angular/forms';
import {IMyDpOptions} from '../../../../node_modules/angular4-datepicker/src/my-date-picker/interfaces/my-options.interface';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['../../ordenestrabajos/ordenestrabajos.component.css']
})
@Injectable()
export class TodoListComponent implements OnInit{
    d = new Date(); 
   public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        disableWeekends:true,
        disableUntil: {year: this.d.getUTCFullYear(), month: this.d.getUTCMonth() + 1, day: this.d.getUTCDate()},
    };
 @Input()  muestrainiciados:boolean;
   @Input()  muestraasunto:boolean;
   @Input()  muestrafecha:boolean;
  @Input()  muestraedita:boolean;
   @Input()  muestrabotonasigna:boolean;
   @Input()  muestraasigna:boolean;
  filter: Book = new Book();
  todos:any[] = [];
   proyecs:any[] = [];
  todo:any = {};
 todoToEdit:any = {};
  todoToDelete:any = {};
  todoToAsigna:any = {};
  fetchingData:boolean = false;
  apiMessage:string;
  saludo:any = {};
   ordenesactuales:any[] = [];
     numbers =[0];
  private url = 'http://localhost:3001';
  //private url = 'http://192.168.10.31:3001';
  //private socket;
  private socket;
      selectedItems = [];
    settings = {};

        onItemSelect(item: any) {
        console.log(item.itemName);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }
  constructor(private todoService:TodoService,private proyService:ProyService) { 
  
}


  today = new Date().toJSON().split('T')[0];
  categorias = ['A', 'B','C', 'D'];
  ingenieros = ['AAC','AGM','ADO','BVB','FBB','JLB','MPG', 'MVP','PBB','RAQ','RRQ','SGC'];
  //proyectistas = ['N/A','NQM', 'JPM','RLZ'];
  proyectistas =[{"id":1,"itemName":"N/A"},
                              {"id":2,"itemName":"CVV"},
                              {"id":3,"itemName":"CSQ"},
                              {"id":4,"itemName":"EN"},
                              {"id":5,"itemName":"FVH"},
                              {"id":6,"itemName":"HSL"},
                              {"id":7,"itemName":"JGP"},
                              {"id":8,"itemName":"JPM"},
                              {"id":9,"itemName":"JSA"},
                              {"id":10,"itemName":"LC"},
                              {"id":11,"itemName":"LIA"},
                              {"id":12,"itemName":"NQM"},
                              {"id":13,"itemName":"PVG"},
                              {"id":14,"itemName":"RLZ"}];
  asuntos=['Detalle Especial','Detalles Metálicos','Notas Generales','Plantas','Vigas','Losas','Elevaciones','Fundaciones','Socalzado','Varios'];
  motivos=['Inicio Desarrollo','Correccion','Mod Arquitectura','Mod Calculo'];

  ngOnInit(): void {
     this.settings = {
            text: "Seleccione Proyectistas",
            selectAllText: 'Selecciona todos',
            unSelectAllText: 'Deseleccionar todos',
            classes: "myclass custom-class"
        };

this.socket = io.connect(this.url);
    this.todoService.showAddTodoBox = true;
    this.todoService.getTodos()
                    .then(td => this.todos = td.todos )
    this.todoService.getTodosfiltrados()
                    .then(td => this.ordenesactuales = td.todos )
    this.proyService.getTodos()
                    .then(td => this.proyecs = td.todos );
    
    // Receive Added Todo
    this.socket.on('TodoAdded', (data) => {
      console.log('TodoAdded: '+JSON.stringify(data));
      this.todos.unshift(data.todo);
      this.apiMessage = data.message;
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


  ngAfterViewInit() {
  }


  AddTodo(todo:any):void{
    if(!todo){ return; }
    todo.fechaplazo=todo.fechaplazo.jsdate;
    this.todoService.createTodo(todo,this.socket);

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
    todo.fechaplazo=todo.fechaplazo.jsdate;
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

   showAsignaTodo(todo:any):void{
   this.todoToAsigna = todo;
   this.apiMessage = "";
 }

 AsignaTodo(todo:any):void{
    if(!todo){ return; }
    todo.id = this.todoToAsigna._id;

    var listaproyecta=[];
    var listaestado=[];
    var listaestadoalter=[];
    if(todo.proyectista.length>1){
    for(var i=0; i<todo.proyectista.length;i++){

      if(todo.proyectista[i]!="N/A"){

        listaproyecta.push(todo.proyectista[i].itemName)
        listaestado.push([todo.proyectista[i].itemName,"Cero"])
        listaestadoalter.push("Cero")
      }
    }
  }else{
    listaproyecta.push("N/A")
  }


    todo.estado=listaestado;
    todo.listaestadoalter=listaestadoalter;
    todo.listaproyectista=listaproyecta;
    this.todoService.updateTodo(todo,this.socket)

  }
userForm = new FormGroup({
    users: new FormArray([
      new FormControl()
    ])
  });
  get users(): FormArray { 
     return this.userForm.get('users') as FormArray; 
  }
  addUserField() { 
     this.users.push(new FormControl()); 
  }
  deleteUserField(index: number) {
     this.users.removeAt(index);
  }
   onFormSubmit(todo:any):void {
if(!this.users){ return; }
//for(let i = 0; i < this.users.length; i++) {
     //console.log(this.users.at(i).value)
     console.log("chamaco perro")
     //todoToAsigna
     todo.id = this.todoToAsigna._id;
     console.log(todo)
     todo.proyectista=this.users.value
    this.todoService.updateTodo(todo,this.socket)  

  //        }
    
  }


}
