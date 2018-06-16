import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  indexRoot = 'IndexPage'
  messageRoot = 'MessagePage'
  meRoot = 'MePage'



  constructor(
    public navCtrl: NavController) {
  }

  
}
