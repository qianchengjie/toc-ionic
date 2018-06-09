import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentPage } from './comment';
import { DateStrPipe } from '../../pipes/date-str/date-str';

@NgModule({
  declarations: [
    CommentPage,
    DateStrPipe
  ],
  imports: [
    IonicPageModule.forChild(CommentPage),
  ],
})
export class CommentPageModule {}
