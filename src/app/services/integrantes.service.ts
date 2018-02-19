// ./angular-client/src/app/todo/todo.service.ts
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

//import 'rxjs/add/operator/toPromise';

@Injectable()
export class IntegrantesService {

  private apiUrl = 'http://192.168.10.31:3001/proyectistas/';
  //private apiUrl = 'http://localhost:3001/proyectistas/api';
   
  //private apiUrl = 'http://192.168.43.127:3001/proyectistas/';
  private seccion=''
  showAddTodoBox:boolean = true;

  constructor(private http: Http){ }

  getTodos(): Promise<any>{
      return this.http.get(this.apiUrl+this.seccion)
                 .toPromise()
                 .then(this.handleData)
                 .catch(this.handleError)
  }

  getTodo(id:string): Promise<any>{
    return this.http.get(this.apiUrl + this.seccion + id)
                    .toPromise()
                    .then(this.handleData)
                    .catch(this.handleError)
  }

  createTodo(todo:any): Promise<any>{
    return this.http.post(this.apiUrl+ this.seccion, todo)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleError)
  }

  updateTodo(todo:any):Promise<any>{
    return this.http
               .put(this.apiUrl, todo)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleData);
  }

  deleteTodo(todo:any):Promise<any>{
    return this.http
               .delete(this.apiUrl + todo._id)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleError);
  }

  private handleData(res: any) {
       let body = res.json();
       console.log(body); // for development purposes only
       return body || {};
   }

 private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for development purposes only
     return Promise.reject(error.message || error);
 }

}
