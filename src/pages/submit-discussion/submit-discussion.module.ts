import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitDiscussionPage } from './submit-discussion';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    SubmitDiscussionPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitDiscussionPage),
    QuillModule
  ],
})
export class SubmitDiscussionPageModule {}
