import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicInfoPage } from './topic-info';

@NgModule({
  declarations: [
    TopicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicInfoPage),
  ],
})
export class TopicInfoPageModule {}
