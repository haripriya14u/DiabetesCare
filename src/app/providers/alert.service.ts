import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isToasting = false;
  okText     = "ok";
  alertText  = "Alert";

  constructor(private alertCtrl: AlertController) { }

  show(text) {
    this.alertCtrl.create({
      header: this.alertText,
      subHeader: text,
      buttons: [this.okText]
    }).then((load) => {
      load.present();
    });
  }

  showWithTitle(title,text) {
    this.alertCtrl.create({
      header: title,
      subHeader: text,
      buttons: [this.okText]
    }).then((load) => {
      load.present();
    });
  }

}
