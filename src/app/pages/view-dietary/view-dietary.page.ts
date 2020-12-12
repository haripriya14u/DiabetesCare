import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-dietary',
  templateUrl: './view-dietary.page.html',
  styleUrls: ['./view-dietary.page.scss'],
})
export class ViewDietaryPage implements OnInit {

  public user;
  public dietaryLogList;

  constructor(
    private authService: AuthenticationService,
    private toast      : ToastService,
    private http       : HttpService,
    public  modal      : ModalController,
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
    this.user = this.authService.getUser().then((data) => {  
      this.user = data;
      this.getDietaryLogData();
    });
  }

  getDietaryLogData() {
    let  data     = [];
    data['token'] = this.user.token;
    
    this.http.getDietaryLog(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.dietaryLogList = data.slice().reverse();
        } else {
          this.dietaryLogList = [];
        }
      } 
    },(error) => {
        this.dietaryLogList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.dietaryLogList[index].isActive) {
      this.dietaryLogList[index].isActive = false;
    } else {
      this.dietaryLogList[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
