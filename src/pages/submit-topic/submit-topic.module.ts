import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitTopicPage } from './submit-topic';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    SubmitTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitTopicPage),
    QuillModule
  ],
})
export class SubmitTopicPageModule {}
