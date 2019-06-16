import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task: Todo;
  taskDescription: string;
  constructor(private ts: TodoService) {}

  changeState(task: Todo) {
    this.ts.changeState(task);
  }
  deleteTodo(task: Todo) {
    this.ts.deleteTodo(task);
  }

  descriptionButton() {
    this.taskDescription =
      this.taskDescription === this.task.description
        ? null
        : this.task.description;
  }

  ngOnInit() {}
}
