import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { ViewGlucosePage } from '../view-glucose/view-glucose.page';

@Component({
  selector: 'app-add-glucose',
  templateUrl: './add-glucose.page.html',
  styleUrls: ['./add-glucose.page.scss'],
})
export class AddGlucosePage implements OnInit {

  public user;

  myGlucose: Number = 0;
  period = [];
  entered_by = 'self';

  date = new Date();
  myDate: String = this.date.toLocaleString();
  myTime: String = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toLocaleString();

  glucoseForm = new FormGroup({
    glucoseValue: new FormControl('', Validators.required),
    test_date   : new FormControl(this.myDate, Validators.required),
    time        : new FormControl(this.myTime, Validators.required),
    period      : new FormControl('', Validators.required),
    entered_by  : new FormControl('', Validators.required),
    entered_name: new FormControl('self', Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private loading    : LoadingService,
    private toast      : ToastService,
    private alert      : AlertService,
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
      this.getGlucoseRanges();
    });
  }

  get formControlsGlucose(): any {
    return this.glucoseForm['controls'];
  }

  getGlucoseRanges() {
    let  data         = [];
    data['token']     = this.user.token;

    this.loading.show();
    this.http.getGlucoseRange(data).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {         
        this.period = response['data'];
      } else if(response['status'] == 202) {
        this.toast.errorToast(response['message']);
      } else {
        this.toast.errorToast('Failed!, please try again later')
      }
    },async (error) => {
        this.loading.hide();    
        this.toast.errorToast('Failed, Please try again later');      
      }
    );
  }

  glucoseFormUpdate() {
    let  data         = this.glucoseForm.value;
    data['token']     = this.user.token;
    data[data.period] = data.glucoseValue;

    this.loading.show();
    this.http.addGlucoseLog(data).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {   
        this.glucoseForm.reset();
        this.alert.show(response['message']);                
      } else if(response['status'] == 202) {
        this.toast.errorToast(response['message']);
      } else {
        this.toast.errorToast('Failed!, please try again later')
      }
    },async (error) => {
        await this.loading.hide();    
        this.toast.errorToast('Failed, Please try again later');      
      }
    );
  }

  async viewGlucose() {
    const modal = await this.modal.create({
      component: ViewGlucosePage,
    });
    return await modal.present();
  }
}
