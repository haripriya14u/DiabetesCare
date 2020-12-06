import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(private loadingCtrl: LoadingController) { }
  
  async show() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please Wait...',
      duration: 10000,
    }).then((load) => {
      load.present().then(() => {
        if (!this.isLoading) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  
  async hide() {
    try {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    } catch (error) { }
  }

  async autoHide(time) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please Wait...',
      duration: time,
    }).then((load) => {
      load.present().then(() => {
        if (!this.isLoading) {
          load.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
}
