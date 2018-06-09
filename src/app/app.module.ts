import { TopicInfoPage } from './../pages/topic-info/topic-info';
import { SearchTopicPage } from './../pages/search-topic/search-topic';
import { UserInfoPage } from './../pages/user-info/user-info';
import { HistoryPage } from './../pages/history/history';
import { DirectivesModule } from './../directives/directives.module';
import { SubmitDiscussionPage } from './../pages/submit-discussion/submit-discussion';
import { TopicPage } from './../pages/topic/topic';
import { MeInfoPage } from './../pages/me-info/me-info';
import { SubmitTopicPage } from './../pages/submit-topic/submit-topic';
import { ComponentsModule } from './../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from '@ionic-native/app-minimize';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { MessageDetailPage } from '../pages/message-detail/message-detail';

import { MessageServiceProvider } from '../providers/message-service/message-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { TopicServiceProvider } from '../providers/topic-service/topic-service';
import { StompService } from 'ng2-stomp-service';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUtilServiceProvider } from '../providers/file-util-service/file-util-service';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { DiscussionServiceProvider } from '../providers/discussion-service/discussion-service';
import { UpvoteServiceProvider } from '../providers/upvote-service/upvote-service';
import { EmojiServiceProvider } from '../providers/emoji-service/emoji-service';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MessageDetailPage,
    SubmitTopicPage,
    SubmitDiscussionPage,
    MeInfoPage,
    HistoryPage,
    UserInfoPage,
    SearchTopicPage,
    TopicInfoPage,
    TopicPage
  ],
  imports: [
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      mode: "md",
      tabsHideOnSubPages: 'true'
    }),
    IonicStorageModule.forRoot({
      name: 'chatdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    BrowserModule,
    QuillModule,
    CommonModule,
    FileUploadModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MessageDetailPage,
    SubmitTopicPage,
    SubmitDiscussionPage,
    HistoryPage,
    UserInfoPage,
    MeInfoPage,
    SearchTopicPage,
    TopicInfoPage,
    TopicPage
  ],
  providers: [
    SQLite,
    StatusBar,
    AppMinimize,
    MobileAccessibility,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MessageServiceProvider,
    UserServiceProvider,
    ChatServiceProvider,
    TopicServiceProvider,
    ChatServiceProvider,
    StompService,
    FileUtilServiceProvider,
    HttpServiceProvider,
    UtilServiceProvider,
    HttpServiceProvider,
    DiscussionServiceProvider,
    UpvoteServiceProvider,
    EmojiServiceProvider,
  ]
})
export class AppModule {
}
