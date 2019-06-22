import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  constructor(private http: HttpClient) {}

  sendMessage(login: Login, msg: string): Observable<any> {
    const data = {
      hash: login.hash,
      message: msg
    };
    return this.http.post('http://ajax.i-marty.eu/addMessage', data);
  }
  sendMessageHash(h: string, msg: string): Observable<any> {
    const data = {
      hash: h,
      message: msg
    };
    return this.http.post('http://ajax.i-marty.eu/addMessage', data);
  }

  getChatroom(): Observable<any> {
    return this.http.get('http://ajax.i-marty.eu/chatMessages');
  }
}
