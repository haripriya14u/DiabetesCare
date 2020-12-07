import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent { 

  exit = 0;
  safePaths = [
    '/menu/details-beneficiary',
    '/signup'
  ];

  constructor(
    private platform       : Platform,
    private splashScreen   : SplashScreen,
    private storage        : Storage,
    private statusBar      : StatusBar,
    private oneSignal      : OneSignal,
    private location       : Location,
    public  toast          : ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.splashScreen.hide();

      //ONE SIGNAL CONFIG
      if(this.platform.is('mobile')) {
        this.oneSignal.startInit('851c06fc-5cff-4cc2-9f6c-f8989e405ed7', '270088942632');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.getIds().then((deviceId) => {
          if(deviceId) { 
            this.storage.set('deviceId', JSON.stringify(deviceId));
          }
        });
        this.oneSignal.handleNotificationReceived().subscribe(() => {});
        this.oneSignal.handleNotificationOpened().subscribe(() => {});
        this.oneSignal.endInit();
      }

      //EXIT APP
      this.platform.backButton.subscribe(() => {  
        const path = window.location.pathname;
        console.log(this.safePaths.lastIndexOf(path));
        if(this.safePaths.lastIndexOf(path)<0) {
          this.showExitConfirm(); 
        }  
      });  
    });
  }

  showExitConfirm() {
    this.toast.create({
      message: 'Do you want to exit?',
      position: 'bottom',
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => { this.exit = 0; }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    }).then(alert => {
      this.exit += 1;
      if(this.exit===1) {alert.present();}
    });
  }
}
