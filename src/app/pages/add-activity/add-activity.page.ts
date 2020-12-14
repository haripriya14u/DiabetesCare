import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { ViewActivityPage } from '../view-activity/view-activity.page';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {
  
  public user;

  period = [];
  activityOption = '';
  date = new Date();
  myDate: String = this.date.toISOString();
  myTime: String = this.date.toISOString();

  activityForm = new FormGroup({
    activity_date    : new FormControl(this.myDate, Validators.required),
    activity_time    : new FormControl(this.myTime, Validators.required),
    glucose_range_id : new FormControl('', Validators.required),
    before_activity  : new FormControl('', Validators.required),
    activity         : new FormControl('', Validators.required),
    activity_duration: new FormControl('', Validators.required),
    activity_others  : new FormControl(''),
    after_activity   : new FormControl('', Validators.required),
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

  get formControlsActivity(): any {
    return this.activityForm['controls'];
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

  activityFormUpdate() {
    let  data         = this.activityForm.value;
    data['token']     = this.user.token;

    this.loading.show();
    this.http.addActivityLog(data).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {   
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

  async viewActivity() {
    const modal = await this.modal.create({
      component: ViewActivityPage,
    });
    return await modal.present();
  }
}
