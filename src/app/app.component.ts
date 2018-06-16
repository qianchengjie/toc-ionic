import { User } from './../models/User';
import { ChatServiceProvider } from './../providers/chat-service/chat-service';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { AppMinimize } from '@ionic-native/app-minimize';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  isLogin: boolean = typeof localStorage.user !== 'undefined';
  rootPage: any = typeof localStorage.token === 'undefined' ? 'LoginPage' : TabsPage;



  // rootPage:any = localStorage.token && (typeof localStorage.token !== 'undefined') ? TabsPage : LoginPage;
  constructor(private app: App,
    private appMinimize: AppMinimize,
    private mobileAccessibility: MobileAccessibility,
    private chatService: ChatServiceProvider,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.mobileAccessibility.usePreferredTextZoom(false);
      statusBar.styleDefault();
      splashScreen.hide();
      if (this.isLogin) {
        this.chatService.initWs();
      }

    //   platform.registerBackButtonAction(() => 
    //   {
    //     let nav = this.app.getActiveNav();
    //     if (app.getActiveNav().canGoBack()) {
    //       app.getActiveNav().pop();
    //     } else {
    //       this.appMinimize.minimize();
    //     }
    //  });
    });
    
  }
}

