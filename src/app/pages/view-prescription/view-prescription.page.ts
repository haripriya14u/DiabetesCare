import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.page.html',
  styleUrls: ['./view-prescription.page.scss'],
})
export class ViewPrescriptionPage implements OnInit {

  public user;
  public params;
  public prescriptionList;

  constructor(
    private authService   : AuthenticationService,
    private toast         : ToastService,
    private http          : HttpService,    
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
      this.getPrescriptionData();
    });
    this.activatedRoute.queryParams.subscribe((beneficiary)=>{
      if(beneficiary) {
        this.params = beneficiary;
      }
    });
  }

  getPrescriptionData() {
    let  data     = [];
    data['token'] = this.user.token;

    if(Object.keys(this.params).length>0) {
      data['beneficiary_registration_id'] = this.params.beneficiary_registration_id;
    }
    
    this.http.getPrescription(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.prescriptionList = data.slice().reverse();
        } else {
          this.prescriptionList = [];
        }
      } 
    },(error) => {
        this.prescriptionList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.prescriptionList[index].isActive) {
      this.prescriptionList[index].isActive = false;
    } else {
      this.prescriptionList[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
