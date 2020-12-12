import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-dietary',
  templateUrl: './add-dietary.page.html',
  styleUrls: ['./add-dietary.page.scss'],
})
export class AddDietaryPage implements OnInit {

  constructor(
    private platform   : Platform,
    private statusBar  : StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });
  }

  ngOnInit() {
  }

}
