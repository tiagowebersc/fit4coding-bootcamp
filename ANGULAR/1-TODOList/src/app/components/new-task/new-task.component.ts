import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.sass']
})
export class NewTaskComponent implements OnInit {
  newTask: Todo = new Todo();
  constructor(private ts: TodoService) {}

  createNewTask() {
    this.ts.createTodo(this.newTask);
    this.newTask = new Todo();
    this.newTask.done = false;
  }

  ngOnInit() {
    this.newTask.done = false;
  }
}
