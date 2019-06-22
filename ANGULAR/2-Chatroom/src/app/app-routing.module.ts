import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'chatroom', component: ChatroomComponent },
  { path: '', redirectTo: 'chatroom', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
