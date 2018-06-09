import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentDetailPage } from './comment-detail';

@NgModule({
  declarations: [
    CommentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentDetailPage),
  ],
})
export class CommentDetailPageModule {}
