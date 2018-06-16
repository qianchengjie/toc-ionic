import { UserServiceProvider } from './../user-service/user-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StompService } from 'ng2-stomp-service';
import { User } from '../../models/User';
import { Message } from '../../models/Message';

@Injectable()
export class ChatServiceProvider {

  db: any;
  user: User;
  
  constructor(private events: Events,
    private stompService: StompService,
    private userService: UserServiceProvider,
    private storage: Storage,
    public http: HttpClient) {
  }

  env: Array<string> = [
    'http://111.231.60.39/toc',
    'http://localhost'
  ]

  prefixUrl: string = this.env[1];

  initWs():void {
    this.user = JSON.parse(localStorage.user);
    if (this.stompService.status !== 'CLOSED') {
      return
    }
    this.stompService.configure({
      host: this.prefixUrl + "/ws",
      headers: {
        userId: this.user.id
      },
      debug: false,
      queue: {
        "init": false
      }
    });
    this.stompService.startConnect().then(() => {
      this.stompService.done('init');
      console.log('websocket连接成功');
      // 接收消息
      this.stompService.subscribe('/user/queue/message', (message: any) => {
        message['type'] = 0;
        //userService
        this.events.publish('/queue/message', message);
        this.insertChat([message], message.from);
      });
      // 接收发送成功消息
      this.stompService.subscribe('/user/queue/response', (data: any) => {
        if (data.code === 0) {
          let message = data.data;
          message['type'] = 1;
          this.insertChat([message], message.to);
          this.events.publish('/queue/response', message);
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  sendMsg(message: Message):void {
    let userId = Number(message.to);
    this.checkUserInUserList(userId).then(flag => {
      if (!flag) {
        this.userService.getUserBasicInfo(userId).subscribe(
          data => {
            this.insertUser(data.data)
          },
          err => {}
        )
      }
    })
    this.stompService.send('/send', message);
  }

  getChatList(userId: number): Promise<any> {
    return this.storage.get('chatList:' + userId)
  }

  getLastChat(userId: number): Promise<any> {
    return this.storage.get('lastChat:' + userId)
  }

  checkUserInUserList(userId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.ready().then(() => 
        this.storage.get('userList').then(data => {
          if (data === null) {
            resolve(false);
            return;
          }
          let u = data.find(item => userId === item.id);
          if (typeof u === 'undefined') {
            resolve(false);
            return;
          }
          this.moveUserToRecently(u);
          resolve(true);
        })
      )
    })
  }

  insertChat(messages: Array<Message>, userId: number): void {
    this.storage.ready().then(() => 
      this.storage.get('chatList:' + userId).then(result => {
        if (result === null) {
          result = []
        }
        let chatList = result.concat(messages)
        this.storage.set('chatList:' +  userId, chatList)
        this.storage.set('lastChat:' +  userId, chatList[chatList.length - 1])
      })
    )
  }

  insertUser(user: User): void {
    this.storage.ready().then(() => 
      this.storage.get('userList').then(data => {
        user.unReadNum = 1;
        if (data === null) {
          this.storage.set('userList', [user]);
          return;
        }
        let u = data.find(item => user.id === item.id);
        if (typeof u === 'undefined') {
          data.unshift(user);
          this.storage.set('userList', data);
        } else {
          this.moveUserToRecently(user);
        }
      })
    )
  }
  
  moveUserToRecently(user: User): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve, reject) => {
      this.storage.get('userList').then(data => {
        let arr = data.filter(item => user.id !== item.id);
        arr.unshift(user);
        this.storage.set('userList', arr);
        resolve(arr);
      })
    })
  }

  getUserList(): Promise<any> {
    return this.storage.get('userList');
  }

  getOneUser(userId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.storage.get('userList').then(data => {
        let u = data.find(user => user.id === userId);
        if (typeof u === 'undefined') {
          reject(new Error());
        }
        resolve(u);
      }).catch(err => reject(err));
    })
  }

  readMessage(userId: number): void {
    this.storage.get('userList').then(data => {
      let u = data.find(user => user.id === userId);
      if (typeof u !== 'undefined') {
        u.unReadNum = 0;
      }
      this.storage.set('userList', data);
    }).catch(err => {});
  }

  removeChatList(): void {
    this.storage.ready().then(() =>
      this.storage.remove('chatList')
    );
  }

  test() {
    this.storage.ready().then(() =>
     this.storage.get('chatList').then((val) => {
       console.log('chatList', val);
     })
   )
  }

}
