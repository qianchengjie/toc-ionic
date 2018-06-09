import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StompService } from 'ng2-stomp-service';

@Injectable()
export class ChatServiceProvider {

  db:any;
  user:any = JSON.parse(localStorage.user);
  
  constructor(private enents: Events,
    private stompService: StompService,
    private storage: Storage,
    public http: HttpClient) {
  }

  env: Array<string> = [
    'http://111.231.60.39/toc',
    'http://localhost'
  ]

  prefixUrl: string = this.env[1];

  initWs():void {
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
        this.enents.publish('/queue/message', message);
        this.insertChat([message], message.from);
      });
      // 接收发送成功消息
      this.stompService.subscribe('/user/queue/response', (data: any) => {
        if (data.code === 0) {
          let message = data.data;
          message['type'] = 1;
          this.insertChat([message], message.to);
          this.enents.publish('/queue/response', message);
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  sendMsg(message: Message):void {
    this.stompService.send('/send', message);
  }

  getChatList(userId: number): Promise<any> {
    return this.storage.get('chatList:' + userId)
  }

  getLastChat(userId: number): Promise<any> {
    return this.storage.get('lastChat:' + userId)
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

  removeChatList(userId: number): void {
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