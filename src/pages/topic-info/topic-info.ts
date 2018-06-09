import { SubmitDiscussionPage } from './../submit-discussion/submit-discussion';
import { Topic } from './../../models/Topic';
import { UserInfoPage } from './../user-info/user-info';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-topic-info',
  templateUrl: 'topic-info.html',
})
export class TopicInfoPage {

  userinfo: User = JSON.parse(localStorage.user);
  topic: Topic;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.topic = navParams.get('topic')
  }
  
  goToUserInfoPage(): void {
    this.navCtrl.push(UserInfoPage, { userinfo: this.userinfo});
  }
  
  goToSubmitDiscussionPage(): void {
    this.navCtrl.push(SubmitDiscussionPage, { topicId: this.topic.id })
  }


}
