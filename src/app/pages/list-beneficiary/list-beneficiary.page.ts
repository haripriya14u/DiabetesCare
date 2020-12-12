import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-list-beneficiary',
  templateUrl: './list-beneficiary.page.html',
  styleUrls: ['./list-beneficiary.page.scss'],
})
export class ListBeneficiaryPage implements OnInit {

  public user;
  public beneficiaryList;

  constructor(
    private authService: AuthenticationService,
    private toast      : ToastService,
    private http       : HttpService,
    private router     : Router,
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
      this.getBeneficiaryByDoctorId();
    });
  }

  getBeneficiaryByDoctorId() {
    let  data     = [];
    data['token'] = this.user.token;

    this.http.getBeneficiaryByDoctorId(data) .subscribe((response) => {
      if(response['status'] == 200) { 
        this.beneficiaryList = response['data'];
      } else {
        this.beneficiaryList = [];
      }
    },(error) => {
        this.beneficiaryList = [];
        this.toast.errorToast('Failed!, please try again later' );
      }
    );
  }

  toBeneficiary(beneficiary) {
    this.router.navigate(['/menu/details-beneficiary'],{
      queryParams: beneficiary,
    });
  }

}
