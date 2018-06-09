import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { User } from './../../models/User';
import { TopicPage } from './../topic/topic';
import { TopicServiceProvider } from './../../providers/topic-service/topic-service';
import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { Topic } from './../../models/Topic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  topics: Array<Topic> = [];
  hasMore: boolean = true;
  pageNum: number = 0;

  user: User = JSON.parse(localStorage.user);

  constructor(private utilService: UtilServiceProvider,
    private navCtrl: NavController,
    private topicService: TopicServiceProvider) {
  }

  
  ionViewDidLoad() {
    this.findAllHistory();
  }

  findAllHistory(): void{
    this.topicService.findAllHistory(this.user.id, this.pageNum).subscribe(
      data => {
        this.topics = data.data
        this.pageNum++;
      },
      err => {}
    );
  }

  doInfinite(infiniteScroll) {
    this.topicService.findAllHistory(this.user.id, this.pageNum).subscribe(
      data => {
        if (data.data.length === 0) {
          infiniteScroll.enable(false);
          this.hasMore = false;
        } else {
          this.topics = this.topics.concat(data.data);
        }
        this.pageNum++;
        infiniteScroll.complete();
      },
      err => infiniteScroll.complete()
    );
  }

  goToTopicPage(topic: Topic): void {
    this.navCtrl.push(TopicPage, { topic });
  }
}
