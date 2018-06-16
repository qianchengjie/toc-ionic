import { NavController } from 'ionic-angular';
import { UserInfoPage } from './../../pages/user-info/user-info';
import { User } from './../../models/User';
import { FollowServiceProvider } from './../../providers/follow-service/follow-service';
import { Component, Input } from '@angular/core';
import { Follow } from '../../models/Follow';

@Component({
  selector: 'following',
  templateUrl: 'following.html'
})
export class FollowingComponent {

  @Input("userId") userId: number;

  following: Array<Follow> = [];
  pageNum: number = 0;
  hasMore: boolean = true;

  constructor(private navCtrl: NavController,
    private followService: FollowServiceProvider) {
      setTimeout(() => {
        this.getAllFollowing();
      }, 100)
  }

  getAllFollowing(): void {
    this.followService.getAllFollowing(this.userId, this.pageNum).subscribe(
      data => {
        this.following = data.data.content;
        this.pageNum++;
        if (data.data.last) {
          this.hasMore = false;
        }
      },
      err => {}
    )
  }

  
  doInfinite(infiniteScroll) {
    this.followService.getAllFollowing(this.userId, this.pageNum).subscribe(
      data => {
        this.following = this.following.concat(data.data.content);
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
