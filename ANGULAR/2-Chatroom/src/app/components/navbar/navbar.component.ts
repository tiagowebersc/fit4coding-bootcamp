import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  title = 'chatroom';
  constructor(private us: UserService) {}

  ngOnInit() {}

  connected(): boolean {
    return this.us.connected();
  }

  logOut() {
    this.us.logOut();
  }
}
