import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-glucose',
  templateUrl: './view-glucose.page.html',
  styleUrls: ['./view-glucose.page.scss'],
})
export class ViewGlucosePage implements OnInit {

  public user;
  public params;
  public glucoseLogList;

  constructor(
    private authService   : AuthenticationService,
    private toast         : ToastService,
    private http          : HttpService,
    public  modal         : ModalController,
    private activatedRoute: ActivatedRoute,
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
      this.getClinicalPorfileData();
    });
    this.activatedRoute.queryParams.subscribe((beneficiary)=>{
      this.params = beneficiary;
    });
  }

  getClinicalPorfileData() {
    let  data     = [];
    data['token'] = this.user.token;

    if(this.params&&Object.keys(this.params).length>0) {
      data['beneficiary_registration_id'] = this.params.beneficiary_registration_id;
    }
    
    this.http.getGlucoseLog(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.glucoseLogList = data.slice().reverse();
        } else {
          this.glucoseLogList = [];
        }
      } else {
        this.glucoseLogList = [];
      }
    },(error) => {
        this.glucoseLogList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.glucoseLogList[index].isActive) {
      this.glucoseLogList[index].isActive = false;
    } else {
      this.glucoseLogList[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  getColor(range) {
    console.log(range);
    switch(range) {
      case 'OUT':
        return 'danger';
      case 'IN':
        return 'success';
      default:
        return 'success';
    }
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
