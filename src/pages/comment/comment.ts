import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  date: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
