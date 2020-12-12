import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.page.html',
  styleUrls: ['./view-activity.page.scss'],
})
export class ViewActivityPage implements OnInit {

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
