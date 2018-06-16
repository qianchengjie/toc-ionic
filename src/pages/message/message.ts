import { Message } from './../../models/Message';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { MessageDetailPage } from '../message-detail/message-detail';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { UtilServiceProvider } from '../../providers/util-service/util-service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  user: any = JSON.parse(localStorage.user);

  userList: Array<User> = [];

  constructor(private events: Events,
    private userService: UserServiceProvider,
    private chatService: ChatServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    
    this.chatService.getUserList().then(data => {
      if (data) {
        this.userList = data;
      }
      this.userList.forEach(user => {
        this.chatService.getLastChat(user.id).then(messages => {
          if (messages) {
            user.lastChat = messages;
          }
        });
      });
    })

    this.events.subscribe('/queue/message', (message: Message) => {
      let fromId = Number(message.from);
      let u = this.userList.find(item => item.id === fromId);
      if (typeof u === 'undefined') {
        this.userService.getUserBasicInfo(fromId).subscribe(
          data => {
            this.chatService.insertUser(data.data);
            this.userList.unshift(data.data)
          },
          err => {}
        )
      }
      this.userList.forEach(user => {
        if (user.id=== fromId) {
          let currentUser = this.navCtrl.getActive().getNavParams().data.user;
          if (!(currentUser && currentUser.id === user.id)) {
            user.unReadNum++;
          }
          user.lastChat = message;
          this.chatService.moveUserToRecently(user).then(list => {
            this.userList = list;
          })
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
        this.chatService.readMessage(user.id);
      }
    });
    this.navCtrl.push(MessageDetailPage, { user });
  }

  getUserBasicInfo(userId: number) {
    this.userService.getUserBasicInfo(userId).subscribe(
      data => {
      }
    );
  }

}



