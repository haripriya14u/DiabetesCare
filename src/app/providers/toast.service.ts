import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  isToasting = false;

  constructor(private toast: ToastController ) { }

  showToast(message: string) {
    this.isToasting = true;
    this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2500
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  successToast(message: string) {
    this.isToasting = true;
    this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2500,
      color: 'success'
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  errorToast(message: string) {
    this.isToasting = true;
    this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2500,
      color: 'danger'
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  customToast(message: string,position: any,duration=2500,color='primary') {
    this.isToasting = true;
    this.toast.create({
      message: message,
      position: position?position:'bottom',
      duration: duration,
      color: color
    }).then((load) => {
      load.present().then(() => {
        if (!this.isToasting) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
}
