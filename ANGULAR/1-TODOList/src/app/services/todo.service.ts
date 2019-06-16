import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';
import { TodoListMock } from '../models/mock-todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoListDB: Todo[];
  constructor() {
    if (localStorage.getItem('todoList') === null) {
      localStorage.setItem('todoList', JSON.stringify(TodoListMock));
    }
    this.todoListDB = JSON.parse(localStorage.getItem('todoList'));
  }
  getTodoList(): Observable<Todo[]> {
    return of(this.todoListDB);
  }
  changeState(task: Todo) {
    const idx = this.todoListDB.indexOf(task);
    if (idx >= 0) {
      this.todoListDB[idx].done = !this.todoListDB[idx].done;
      this.updateLocalStorage();
    }
  }
  createTodo(task: Todo) {
    this.todoListDB.push(task);
    this.updateLocalStorage();
  }
  deleteTodo(task: Todo) {
    const idx = this.todoListDB.indexOf(task);
    if (idx >= 0) {
      this.todoListDB.splice(idx, 1);
      this.updateLocalStorage();
    }
  }
  updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoListDB));
  }
}
