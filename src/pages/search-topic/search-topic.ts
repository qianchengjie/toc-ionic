import { TopicPage } from './../topic/topic';
import { TopicServiceProvider } from './../../providers/topic-service/topic-service';
import { Topic } from './../../models/Topic';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, Searchbar, NavController } from 'ionic-angular';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
@IonicPage()
@Component({
  selector: 'page-search-topic',
  templateUrl: 'search-topic.html',
})
export class SearchTopicPage {


  @ViewChild(Searchbar) searchBar: Searchbar;

  topics: Array<Topic> = [];

  constructor(private viewCtrl: ViewController,
    private navCtrl: NavController,
    private utilService: UtilServiceProvider,
    public topicService: TopicServiceProvider) {
      
    
  }

  searchTopic(ev: any): void {
    this.topics = [];
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.topicService.searchTopic(val).subscribe(
        data => {
          this.topics = data.data;
        },
        err => {}
      )
    }
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 10);
  }

  
  goToTopicPage(topic: Topic): void {
    this.navCtrl.push(TopicPage, { topic });
    this.viewCtrl.dismiss();
  }

  onCancel(): void {
    this.viewCtrl.dismiss();
  }

}
