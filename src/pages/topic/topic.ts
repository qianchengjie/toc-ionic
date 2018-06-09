import { History } from './../../models/History';
import { TopicServiceProvider } from './../../providers/topic-service/topic-service';
import { User } from './../../models/User';
import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { UpvoteServiceProvider } from './../../providers/upvote-service/upvote-service';
import { DiscussionServiceProvider } from './../../providers/discussion-service/discussion-service';
import { SubmitDiscussionPage } from './../submit-discussion/submit-discussion';
import { Topic } from './../../models/Topic';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Discussion } from '../../models/Discussion';
import { Upvote } from '../../models/Upvote';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Collection } from '../../models/Collection';
import { UserInfoPage } from '../user-info/user-info';
import { TopicInfoPage } from '../topic-info/topic-info';

@IonicPage()
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {

  discussions: Array<Discussion> = [];
  nowIndex: number = 0;
  discussionsCount: number = 0;
  hasMore: boolean = true;
  upvote: Upvote = new Upvote();
  collection: Collection = null;
  user: User = JSON.parse(localStorage.user);
  userinfo: User = new User();
  

  topic: Topic;

  @ViewChild(Slides) slides: Slides;

  constructor(private topicService: TopicServiceProvider,
    private userService: UserServiceProvider,
    private utilService: UtilServiceProvider,
    private upvoteService: UpvoteServiceProvider,
    private discussionService: DiscussionServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    this.topic = navParams.get('topic');

    this.upvote.userId = this.user.id;
    this.upvote.type = 1;

    let history = new History();
    history.topicId = this.topic.id;
    history.userId = this.user.id;
    topicService.addHistroy(history).subscribe(
      data=>{},
      err=>{}
    )
  }


  getAllDiscussionByTopicId(): void {
    this.discussionService.getAllDiscussionByTopicId(this.topic.id).subscribe(
      data => {
        this.discussions = data.data;
        if (this.discussions.length > 0) {
          this.getUpvoteState(this.discussions[this.nowIndex].id);
          this.getUserBasicInfo(this.discussions[this.nowIndex].userId);
          this.discussionsCount = data.data.length;
        }
      },
      err => {}
    );
  }

  goToSubmitDiscussionPage(): void {
    this.navCtrl.push(SubmitDiscussionPage, { topicId: this.topic.id })
  }

  goToTopicInfoPage(): void {
    this.navCtrl.push(TopicInfoPage, { topic: this.topic });
  }

  ionViewWillEnter() {
    this.getAllDiscussionByTopicId();
    this.slides.slideNext(0)
  }

  ionSlideWillChange(item) {
    if (item.isBeginning() || item.isEnd()) {
      if (item.isBeginning()) {
        this.getDiscussion(-1);
      } else {
        this.getDiscussion(1);
      }
      this.slides.slideTo(1, 0);
    }
    if (this.upvote.pId !== this.discussions[this.nowIndex].id) {
      this.getUpvoteState(this.discussions[this.nowIndex].id);
      this.getUserBasicInfo(this.discussions[this.nowIndex].userId);
    }
  }

  getDiscussion(direction: number): void {
    if (this.discussions.length === this.discussionsCount) {
      this.hasMore = false;
      this.discussions = this.moveElement(this.discussions, -direction);
    } else {
      let discussion = new Discussion();
      if (direction === -1) {
        if (this.nowIndex === 0) {
          this.discussions.unshift(discussion);
        } else {
          this.nowIndex--;
        }
      } else {
        if (this.nowIndex === this.discussions.length - 2) {
          this.discussions.push(discussion);
        }
        this.nowIndex++;
      }
    }
  }

  doUpvote(): void {
    this.upvote.state = this.upvote.state === 0 ? 1 : 0;
    this.upvoteService.upvote(this.upvote).subscribe(
      data => this.upvote = data.data,
      err => {}
    );
  }
  
  doCollection(): void {
    if (this.collection === null) {
      let collection = new Collection();
      collection.userId = this.user.id;
      collection.topicId = this.topic.id;
      this.topicService.addCollection(collection).subscribe(
        data => {
          this.collection = data.data;
        },
        err => {}
      );
    } else {
      this.topicService.deleteCollection(this.collection.id).subscribe(
        data => {
          this.collection = null;
        },
        err => {}
      );
    }
    
  }

  getUpvoteState(discussionId: number): void {
    this.upvote.pId = discussionId;
    this.upvoteService.getUpvoteState(this.upvote.userId, this.upvote.pId, this.upvote.type).subscribe(
      data => this.upvote.state = data.data,
      err => {}
    );
  }

  getUserBasicInfo(userId: number): void {
    this.userService.getUserBasicInfo(userId).subscribe(
      data => this.userinfo = data.data,
      err => {}
    )
  }

  goToUserInfoPage(): void {
    this.navCtrl.push(UserInfoPage, { userinfo: this.userinfo});
  }

  moveElement(arr: Array<Discussion>, n: number): Array<Discussion> {
    if (Math.abs(n) > arr.length) n = n % arr.length
    return arr.slice(-n).concat(arr.slice(0, -n))
  }

}
