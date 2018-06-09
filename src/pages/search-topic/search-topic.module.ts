import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTopicPage } from './search-topic';

@NgModule({
  declarations: [
    SearchTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTopicPage),
  ],
})
export class SearchTopicPageModule {}
