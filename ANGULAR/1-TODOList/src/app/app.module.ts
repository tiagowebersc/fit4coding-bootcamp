import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { TaskComponent } from './components/task/task.component';
import { DescriptionComponent } from './components/description/description.component';

@NgModule({
  declarations: [AppComponent, ListComponent, NewTaskComponent, TaskStatusPipe, TaskComponent, DescriptionComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
