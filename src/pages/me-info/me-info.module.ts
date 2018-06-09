import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeInfoPage } from './me-info';

@NgModule({
  declarations: [
    MeInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MeInfoPage),
  ],
})
export class MeInfoPageModule {}
