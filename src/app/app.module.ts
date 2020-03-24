import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { LoginService } from './api/login.service'
import { Vibration } from '@ionic-native/vibration/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { IonicStorageModule } from '@ionic/storage';
import { SocketService } from './api/socket.service'
import { CallNumber } from '@ionic-native/call-number/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService,
    HTTP,
    Vibration,
    OneSignal,
    BackgroundMode,
    SocketService,
    CallNumber
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
