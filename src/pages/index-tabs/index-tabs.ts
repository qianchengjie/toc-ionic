import { HotComponent } from './../../components/hot/hot';
import { SuperTabs } from 'ionic2-super-tabs';
import { RecComponent } from './../../components/rec/rec';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-index-tabs',
  templateUrl: 'index-tabs.html',
})
export class IndexTabsPage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  hot: any = HotComponent;
  rec: any = RecComponent;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
