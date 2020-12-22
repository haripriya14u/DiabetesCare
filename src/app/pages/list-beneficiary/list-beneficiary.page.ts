import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector   : 'app-list-beneficiary',
  templateUrl: './list-beneficiary.page.html',
  styleUrls  : ['./list-beneficiary.page.scss'],
})
export class ListBeneficiaryPage implements OnInit {

  public user;
  public pageFrom;
  public beneficiaryList;

  constructor(
    private authService   : AuthenticationService,
    private toast         : ToastService,
    private http          : HttpService,
    private router        : Router,
    private activatedRoute: ActivatedRoute,
    private callNumber    : CallNumber,
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
      this.getBeneficiaryByDoctorId();
    });
    this.activatedRoute.queryParams.subscribe((data)=>{ this.pageFrom = data.pageFrom; });
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
    if(this.pageFrom) {
      switch(this.pageFrom) {
        case 'chat':
          this.router.navigate(['/menu/ask-my-doctor'],{
            queryParams: beneficiary
          });
        break;
        case 'glucoseLog':
          this.router.navigate(['/menu/view-glucose'],{
            queryParams: beneficiary
          });
        break;
        case 'quickContact':
          this.callNumber.callNumber(beneficiary.beneficiary_phone, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => this.toast.errorToast('Failed, please try again later'));
        break;
        case 'prescription':
          this.router.navigate(['/menu/add-prescription'],{
            queryParams: beneficiary
          });
        break;
      }
    } else {
      this.router.navigate(['/menu/details-beneficiary'],{
        queryParams: beneficiary
      });
    }
  }

}
