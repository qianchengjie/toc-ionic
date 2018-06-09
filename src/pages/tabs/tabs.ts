import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  indexRoot = 'IndexPage'
  messageRoot = 'MessagePage'
  meRoot = 'MePage'


  constructor(private chatService: ChatServiceProvider,
    public navCtrl: NavController) {
    // this.chatService.initWs();
  }

  
}
