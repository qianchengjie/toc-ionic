import { UtilServiceProvider } from './../../providers/util-service/util-service';
import { TopicPage } from './../../pages/topic/topic';
import { App } from 'ionic-angular';
import { TopicServiceProvider } from './../../providers/topic-service/topic-service';
import { Component } from '@angular/core';
import { Topic } from '../../models/Topic';

@Component({
  selector: 'rec',
  templateUrl: 'rec.html'
})
export class RecComponent {

  topics: Array<Topic> = [];

constructor(private utilService: UtilServiceProvider,
    private app: App,
    private topicService: TopicServiceProvider) {
  }

  
  ionViewDidLoad() {
    this.getAllTopics();
  }

  getAllTopics(): void{
    this.topicService.getAllTopics().subscribe(
      data => this.topics = data.data
    );
  }

  doRefresh(refresher) {
    this.topicService.getAllTopics().subscribe(
      data => {
        this.topics = data.data;
        refresher.complete();
      },
      err => refresher.complete()
    );
  }

  goToTopicPage(topic: Topic): void {
    this.app.getRootNav().push(TopicPage, { topic });
  }

}
