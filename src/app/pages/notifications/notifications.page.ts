import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public user;
  public params;
  public notificationList;

  constructor(
    private authService   : AuthenticationService,
    private toast         : ToastService,
    private http          : HttpService,    
    private platform      : Platform,
    private statusBar     : StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser().then((data) => {  
      this.user = data;
      this.getNotificationData();
    });
  }

  getNotificationData() {
    let  data        = [];
    data['token']    = this.user.token;
    data['userType'] = this.user.userType;
    
    this.http.getNotification(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.notificationList = data.slice().reverse();
        } else {
          this.notificationList = [];
        }
      } else {
        this.notificationList = [];
      }
    },(error) => {
        this.notificationList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  getLocal(datetime) {
    return moment.unix(datetime).utc().format('lll');
  }

}
