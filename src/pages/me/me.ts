import { Page } from 'ionic-angular/navigation/nav-util';
import { HistoryPage } from './../history/history';
import { MeInfoPage } from './../me-info/me-info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserInfoPage } from '../user-info/user-info';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  user: any = JSON.parse(localStorage.user);

  historyPage: Page = HistoryPage;
  userInfoPage: Page = UserInfoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToMeInfoPage(): void {
    this.navCtrl.push(MeInfoPage);
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.user);
  }

}
