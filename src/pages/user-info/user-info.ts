import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  user: User = JSON.parse(localStorage.user);

  myself: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let user = navParams.get('userinfo');
    if (user) {
      this.user = user;
      this.myself = false;
    }
  }

  back(): void {
    this.navCtrl.pop();
  }
  

}
