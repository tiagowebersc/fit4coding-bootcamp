import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  login: Login;

  storeLogin(login: Login) {
    this.login = login;
    localStorage.setItem('userLogin', JSON.stringify(login));
  }
  getLogin(): Login {
    const localS = localStorage.getItem('userLogin');
    if (localS) {
      this.login = JSON.parse(localS);
    }
    return this.login;
  }
  connected(): boolean {
    if (this.login) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    this.login = null;
    localStorage.setItem('userLogin', '');
  }
  registerAPI(login: Login): Observable<any> {
    const data = {
      login: login.user,
      password: login.password
    };
    return this.http.post('http://ajax.i-marty.eu/addUser', data);
  }
  loginAPI(login: Login): Observable<any> {
    const data = {
      login: login.user,
      password: login.password
    };
    return this.http.post('http://ajax.i-marty.eu/checkUser', data);
  }

  sendMessage(login: Login, message: string) {}
}
