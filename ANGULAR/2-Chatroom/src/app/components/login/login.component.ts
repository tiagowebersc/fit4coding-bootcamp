import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();

  constructor(private us: UserService, private routing: Router) {}

  ngOnInit() {}

  enterUser() {
    this.login.error = '';
    console.log('trying ' + this.login.user + ' ' + this.login.password);
    if (this.login.user === undefined || this.login.user.length === 0) {
      this.login.error = 'User must be informed!';
      return;
    }
    if (this.login.password === undefined || this.login.password.length === 0) {
      this.login.error = 'Password must be informed!';
      return;
    }
    this.us.loginAPI(this.login).subscribe(r => {
      if (r.retour === 0) {
        this.login.error = r.serverMsg;
        return;
      }
      this.login.hash = r.retour;
      this.us.storeLogin(this.login);
      this.routing.navigate(['chatroom']);
    });
  }
}
