import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-clinical',
  templateUrl: './view-clinical.page.html',
  styleUrls: ['./view-clinical.page.scss'],
})
export class ViewClinicalPage implements OnInit {

  public user;
  public clinicalProfileList;

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
      this.getClinicalPorfileData();
    });
  }

  getClinicalPorfileData() {
    let  data     = [];
    data['token'] = this.user.token;
    
    this.http.getClinicalPorfile(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.clinicalProfileList = data.slice().reverse();
        } else {
          this.clinicalProfileList = [];
        }
      } 
    },(error) => {
        this.clinicalProfileList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.clinicalProfileList[index].isActive) {
      this.clinicalProfileList[index].isActive = false;
    } else {
      this.clinicalProfileList[index].isActive = true;
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
