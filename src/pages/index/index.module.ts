import { SuperTabsModule } from 'ionic2-super-tabs';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from './index';

@NgModule({
  declarations: [
    IndexPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexPage),
    SuperTabsModule.forRoot()
  ]
})
export class IndexPageModule {}
