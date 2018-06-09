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


  rootPage:any = typeof localStorage.token === 'undefined' ? 'LoginPage' : TabsPage;

  // rootPage:any = localStorage.token && (typeof localStorage.token !== 'undefined') ? TabsPage : LoginPage;
  constructor(private app: App,
    private appMinimize: AppMinimize,
    private mobileAccessibility: MobileAccessibility,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      mobileAccessibility.usePreferredTextZoom(false);
      statusBar.styleDefault();
      splashScreen.hide();
      platform.registerBackButtonAction(() => 
      {
        let nav = app.getActiveNav();
        alert(nav.id)
        alert(nav.name)
        alert(nav.length)
        if (app.getActiveNav().canGoBack()) {
          app.getActiveNav().pop();
        } else {
          appMinimize.minimize();
        }
     });
    });
    
  }
}

