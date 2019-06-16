import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  transform(list: Todo[], status: boolean): any {
    return list.filter(task => task.done === status);
  }
}
