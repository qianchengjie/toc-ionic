import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { TopicPage } from './../../pages/topic/topic';
import { App } from 'ionic-angular';
import { TopicServiceProvider } from './../../providers/topic-service/topic-service';
import { Component } from '@angular/core';
import { Topic } from '../../models/Topic';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@Component({
  selector: 'rec',
  templateUrl: 'rec.html'
})
export class RecComponent {

  topics: Array<Topic> = [];
  pageNum: number = 0;
  hasMore: boolean = true;

  constructor(private utilService: UtilServiceProvider,
    private app: App,
    private messageService: MessageServiceProvider,
    private topicService: TopicServiceProvider) {
  }

  
  ionViewDidLoad() {
    this.getAllTopics();
  }

  getAllTopics(): void{
    this.topicService.getAllTopics(this.pageNum).subscribe(
      data => {
        this.topics = data.data.content;
        this.pageNum++;
        if (data.data.last) {
          this.hasMore = false;
        }
      },
      err => {}
    );
  }

  doRefresh(refresher) {
    this.topicService.getAllTopics(this.pageNum).subscribe(
      data => {
        for (let item of data.data.content) {
          this.topics.unshift(item);
        }
        refresher.complete();
        this.pageNum++;
        if (data.data.content.length === 0) {
          this.messageService.toast('已无更多话题');
        }
        if (data.data.last) {
          this.hasMore = false;
        }
      },
      err => refresher.complete()
    );
  }
  
  doInfinite(infiniteScroll) {
    this.topicService.getAllTopics(this.pageNum).subscribe(
      data => {
        this.topics = this.topics.concat(data.data.content);
        this.pageNum++;
        if (data.data.last) {
          infiniteScroll.enable(false);
          this.hasMore = false;
        }
        if (data.data.content.length === 0) {
          this.messageService.toast('已无更多话题');
        }
      },
      err => infiniteScroll.complete()
    );
  }


  goToTopicPage(topic: Topic): void {
    this.app.getRootNav().push(TopicPage, { topic });
  }

}
