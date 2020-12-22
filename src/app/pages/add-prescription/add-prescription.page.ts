import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/providers/loading.service';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.page.html',
  styleUrls: ['./add-prescription.page.scss'],
})
export class AddPrescriptionPage implements OnInit {
  
  public params;
  public user;

  date = new Date();
  myDate: String = this.date.toUTCString();
  myTime: String = this.date.toUTCString();

  prescriptionForm = new FormGroup({
    prescription_date: new FormControl(this.myDate, Validators.required),
    prescription_time: new FormControl(this.myTime, Validators.required),
    prescription     : new FormControl('', Validators.required),
  });

  constructor(
    private authService   : AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private http          : HttpService,
    private loading       : LoadingService,
    private alert         : AlertService,
    private toast         : ToastService,
    private platform      : Platform,
    private statusBar     : StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });
    this.activatedRoute.queryParams.subscribe((beneficiary)=>{
      this.params = beneficiary;
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser().then((data) => {  
      this.user = data; 
    });
  }

  get formControlsPrescription(): any {
    return this.prescriptionForm['controls'];
  }

  addPrescription() {
    let  data                           = this.prescriptionForm.value;
    data['token']                       = this.user.token;
    data['beneficiary_registration_id'] = this.params.beneficiary_registration_id;

    let date = moment(new Date(this.prescriptionForm.value.prescription_date)).format('YYYY-MM-DD');
    let time = moment(new Date(this.prescriptionForm.value.prescription_time)).format('HH:mm:ss');
    data['prescription_datetime'] = moment(date+' '+time).utc().format('YYYY-MM-DD HH:mm:ss');

    this.loading.show();
    this.http.addPrescription(data).subscribe(async (response) => {
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

}
