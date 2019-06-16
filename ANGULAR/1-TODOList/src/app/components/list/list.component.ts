import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  todoList: Todo[];
  constructor(private ts: TodoService) {}

  loadTodoList() {
    this.ts.getTodoList().subscribe(list => (this.todoList = list));
  }

  ngOnInit() {
    this.loadTodoList();
  }
}
