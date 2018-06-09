import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IndexTabsPage } from './index-tabs';

@NgModule({
  declarations: [
    IndexTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexTabsPage),
    SuperTabsModule.forRoot()
  ]
})
export class IndexTabsPageModule {}
