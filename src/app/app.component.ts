import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Log In',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Lead List',
      url: '/leadllist',
      icon: 'list'
    },
    {
      title: 'Lead Accept',
      url: '/leadalert',
      icon: 'call'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    }
    ,
    {
      title: 'Lead Activity Log',
      url: '/activitylog',
      icon: 'person'
    },
    {
      title: 'Lead Accept Success',
      url: '/leadacceptsuccess',
      icon: 'person'
    },
    {
      title: 'Lead Accept Failed',
      url: '/leadacceptfailed',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
