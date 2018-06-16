import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicPage } from './topic';
import { DateStrPipe } from '../../pipes/date-str/date-str';

@NgModule({
  declarations: [
    DateStrPipe,
    TopicPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicPage),
    ComponentsModule
  ],
})
export class TopicPageModule {}
