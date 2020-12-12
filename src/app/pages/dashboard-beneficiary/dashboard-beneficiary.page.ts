import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard-beneficiary',
  templateUrl: './dashboard-beneficiary.page.html',
  styleUrls: ['./dashboard-beneficiary.page.scss'],
})
export class DashboardBeneficiaryPage implements OnInit {

  public user;

  constructor(
    private router   : Router,
    private auth     : AuthenticationService,
    private platform : Platform,
    private statusBar: StatusBar,
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#729fd7');
      this.statusBar.styleLightContent();
    });
  }

  ngOnInit() {
    this.user = this.auth.getUser().then((data) => {    
      this.user = data;  
    });
  }

  toPage(page: string) {
    this.router.navigateByUrl(page, {replaceUrl: true});
  }
}
