import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { MessageDetailPage } from '../message-detail/message-detail';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  user:any = JSON.parse(localStorage.user);

  userList: Array<User> = [];

  constructor(private events: Events,
    private userService: UserServiceProvider,
    private chatService: ChatServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    let users = [
      new User(1, '张三', 0, null),
      new User(2, '李四', 0, null)
    ]
    users.forEach(user => {
      if (user.id != this.user.id) {
        this.userList.push(user);
      }
    });
    this.userList.forEach(user => {
      this.chatService.getLastChat(user.id).then(messages => {
        if (messages) {
          user.lastChat = messages;
        }
      });
    });
    this.getUserBasicInfo(1)
  }

  ionViewWillEnter() {
    this.events.subscribe('/queue/message', (message: Message) => {
      this.userList.forEach(user => {
        if (user.id.toString() === message.from) {
          let currentUser = this.navCtrl.getActive().getNavParams().data.user;
          if (!(currentUser && currentUser.id === user.id)) {
            user.unReadNum++;
          }
          user.lastChat = message;
        }
      });
    });
  }

  ionViewWillUnload() {
    this.events.unsubscribe('/queue/message');
  }

  goToMessageDetailPage(user: User) {
    this.userList.forEach(item => {
      if (user.id === item.id) {
        item.unReadNum = 0;
      }
    });
    this.navCtrl.push(MessageDetailPage, { user });
  }

  getUserBasicInfo(userId: number) {
    this.userService.getUserBasicInfo(userId).subscribe(
      data => {
        console.log(data)
      }
    );
  }

}

class Message {
  id: string;
  content: string;
  from: string;
  to: string;
  status: number;
  sendTime: Date;
  receiveTime: Date;
  destination: string;
  type: number;
  constructor(content: string,
    from: string,
    to: string,
    destination: string,
    type: number) {
    this.content = content;
    this.from = from;
    this.to = to;
    this.destination = destination;
    this.type = type;
  }
}

class User {
  id: number;
  name: string;
  lastChat: Message;
  unReadNum: number;
  constructor(id: number,
  name: string,
  unReadNum: number,
  lastChat: Message) {
    this.id = id;
    this.name = name;
    this.unReadNum = unReadNum;
    this.lastChat = lastChat;
  }
}

