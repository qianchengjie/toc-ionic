import { ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';

import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';


@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {

  @ViewChild(Content) content: Content;
  // type 0为对方，1为本人
  messagesList: Array<Message> = [];

  messageContent: string = '';
  user: any = JSON.parse(localStorage.user);
  toUser: User;
  unReadCount: number = 0;
  emojiPickerShow: boolean = false;
  paddingBottom: number = 0;

  constructor(private events: Events,
    private messageService: MessageServiceProvider,
    private chatService: ChatServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    let user = navParams.get('user');
    this.toUser = user;
  }

  ionViewDidLoad() {
    // console.log(this.chatService.removeChatList());
    // this.chatService.insertChat(this.messagesList);
    this.chatService.getChatList(this.toUser.id).then(result => {
      if (result) {
        this.messagesList = result;
        this.scrollToBottom(0);
      }
    });
    this.content.getScrollElement().onscroll = () => {
      let $scrollContent = this.content.getScrollElement();
      if ($scrollContent.scrollHeight - $scrollContent.scrollTop <= $scrollContent.clientHeight + 100 ) {
         this.unReadCount = 0;
      }
    }
    this.initChat();
  }

  ionViewWillLeave() {
    this.events.unsubscribe('/queue/message');
  }

  ionViewWillEnter() {
  }

  initChat() {
    // 接收消息
    this.events.subscribe('/queue/message', message => {
      this.messagesList.push(message);
      let $scrollContent = this.content.getScrollElement();
      if ($scrollContent.scrollHeight - $scrollContent.scrollTop <= $scrollContent.clientHeight * 3/2 ) {
        this.scrollToBottom(200);
      } else {
        this.unReadCount++;
      }
    })
    // 发送成功回调
    this.events.subscribe('/queue/response', message => {
      console.log(message)
    })
  }

  sendMsg(): void {
    if (!this.messageContent) {
      this.messageService.toast('请填写回复内容');
    } else {
      // 发送消息
      let message = new Message(
        this.messageContent,
        this.user.id,
        this.toUser.id.toString(),
        '/queue/message',
        1
      )
      this.chatService.sendMsg(message);
      message.sendTime = new Date();
      this.messagesList.push(message);
      this.messageContent = null;
      this.scrollToBottom(200);
     }
  }

  scrollToBottom(speed: number): void {
    setTimeout(() => {
        this.content.scrollToBottom(speed);
    }, 10)
  }

  showEmojiPicker(): void {
    this.emojiPickerShow = !this.emojiPickerShow;
    this.scrollToBottom(0);
  }

  onInput(e): void {
    let oldPaddingBottom = this.paddingBottom;
    this.paddingBottom = e.currentTarget.parentNode.parentNode.parentNode.clientHeight - 56;
    let $scrollContent = this.content.getScrollElement();
    this.content.scrollTo(0, $scrollContent.scrollTop - oldPaddingBottom + this.paddingBottom, 0);
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
  constructor(id: number,
  name: string,
  lastChat: Message) {
    this.id = id;
    this.name = name;
    this.lastChat = lastChat;
  }
}
