import { SearchTopicPage } from './../search-topic/search-topic';
import { HotComponent } from './../../components/hot/hot';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Page } from 'ionic-angular/navigation/nav-util';
import { SubmitTopicPage } from '../submit-topic/submit-topic';
import { RecComponent } from '../../components/rec/rec';

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  rec: any = RecComponent;
  hot: any = HotComponent;

  submitTopicPage: Page = SubmitTopicPage;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  showSearchTopicPage(): void {
    this.modalCtrl.create(SearchTopicPage).present();
  }

  
  refreshTopic(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
