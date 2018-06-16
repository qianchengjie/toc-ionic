import { UserInfoPage } from './../../pages/user-info/user-info';
import { User } from './../../models/User';
import { NavController } from 'ionic-angular';
import { FollowServiceProvider } from './../../providers/follow-service/follow-service';
import { Follow } from './../../models/Follow';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'followed',
  templateUrl: 'followed.html'
})
export class FollowedComponent {

  @Input("userId") userId: number;

  followed: Array<Follow> = [];
  pageNum: number = 0;
  hasMore: boolean = true;

  constructor(private navCtrl: NavController,
    private followService: FollowServiceProvider) {
      setTimeout(() => {
        this.getAllFollowing();
      }, 1)
  }

  getAllFollowing(): void {
    this.followService.getAllFollowed(this.userId, this.pageNum).subscribe(
      data => {
        this.followed = data.data.content;
        this.pageNum++;
        if (data.data.last) {
          this.hasMore = false;
        }
      },
      err => {}
    )
  }

  
  doInfinite(infiniteScroll) {
    this.followService.getAllFollowed(this.userId, this.pageNum).subscribe(
      data => {
        this.followed = this.followed.concat(data.data.content);
        this.pageNum++;
        if (data.data.last) {
          infiniteScroll.enable(false);
          this.hasMore = false;
        }
      },
      err => infiniteScroll.complete()
    );
  }

  goToUserinfoPage(userinfo: User): void {
    this.navCtrl.push(UserInfoPage, { userinfo })
  }
}
