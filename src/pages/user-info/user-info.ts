import { MessageDetailPage } from './../message-detail/message-detail';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { FollowServiceProvider } from './../../providers/follow-service/follow-service';
import { Follow } from './../../models/Follow';
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
  userinfo: User;

  isFollow: boolean = false;
  followObj: Follow;

  showFollowed: boolean = true;

  myself: boolean = true;

  constructor(private userService: UserServiceProvider,
    public navCtrl: NavController,
    private followService: FollowServiceProvider,
    private messageService: MessageServiceProvider,
    public navParams: NavParams) {
    let userinfo = navParams.get('userinfo');
    if (userinfo && userinfo.id !== this.user.id) {
      this.userinfo = userinfo;
      this.myself = false;
      this.followService.isFollow(this.user.id, this.userinfo.id).subscribe(
        data => {
          this.isFollow = data.data !== null;
          this.followObj = data.data;
        }
      )
    } else {
      this.userinfo = this.user;
    }
  }

  goToMessageDetailPage() {
    this.navCtrl.push(MessageDetailPage, { user: this.userinfo })
  }

  follow(userId: number): void {
    let follow = new Follow();
    follow.followId = userId;
    follow.userId = this.user.id;
    this.followService.follow(follow).subscribe(
      data => {
        this.isFollow = true;
        this.messageService.toast('关注成功');
        this.user.followingNum++;
        this.userinfo.followedNum++;
        localStorage.user = JSON.stringify(this.user);
      },
      err => {}
    )
  }

  unfollow(): void {
    this.followService.unfollow(this.followObj.id).subscribe(
      data => {
        this.isFollow = false;
        this.messageService.toast('取消关注成功');
        this.user.followingNum--;
        this.userinfo.followedNum--;
        localStorage.user = JSON.stringify(this.user);
      },
      err => {}
    )
  }

  doShowFollowed(): void {
    this.showFollowed = true;
  }

  doShowFollowing(): void {
    this.showFollowed = false;
  }
  

  back(): void {
    this.navCtrl.pop();
  }
  

}
