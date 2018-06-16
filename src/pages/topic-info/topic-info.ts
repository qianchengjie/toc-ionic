import { SubmitDiscussionPage } from './../submit-discussion/submit-discussion';
import { Topic } from './../../models/Topic';
import { UserInfoPage } from './../user-info/user-info';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-topic-info',
  templateUrl: 'topic-info.html',
})
export class TopicInfoPage {

  userinfo: User = new User();
  user: User = JSON.parse(localStorage.user);
  topic: Topic;

  constructor(private userService: UserServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.topic = navParams.get('topic')
    this.userService.getUserBasicInfo(this.topic.userId).subscribe(
      data => this.userinfo = data.data,
      err => {}
    )
  }
  
  goToUserInfoPage(): void {
    this.navCtrl.push(UserInfoPage, { userinfo: this.userinfo});
  }
  
  goToSubmitDiscussionPage(): void {
    this.navCtrl.push(SubmitDiscussionPage, { topicId: this.topic.id })
  }

}
