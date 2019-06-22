import { Component, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom';
import { Login } from 'src/app/models/login';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.sass']
})
export class ChatroomComponent implements OnInit {
  login: Login = new Login();
  hash: string;
  chatroom: Chatroom[];
  message: string;
  messageError: string;
  nrMsg: number = 0;

  constructor(private cs: ChatroomService, private us: UserService) {
    setInterval(() => {
      this.cs.getChatroom().subscribe(chatroom => {
        this.chatroom = chatroom.Messages;
        setTimeout(() => {
          if (this.nrMsg !== this.chatroom.length) {
            this.nrMsg = this.chatroom.length;
            const objChat = document.querySelector('.chatView');
            if (objChat) {
              objChat.scrollTop = objChat.scrollHeight;
            }
          }
        }, 10);
      });
    }, 500);
  }
  ngOnInit() {
    this.login = this.us.getLogin();
  }
  sendMessage() {
    this.messageError = null;
    if (this.message) {
      this.cs.sendMessage(this.login, this.message).subscribe(r => {
        if (r.retour !== 1) {
          this.messageError = r.serverMsg;
          return;
        }
      });
    }
    this.message = null;
  }
  connected(): boolean {
    return this.us.connected();
  }
}
