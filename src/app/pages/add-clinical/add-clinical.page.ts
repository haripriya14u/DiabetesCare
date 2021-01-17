import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { ViewClinicalPage } from '../view-clinical/view-clinical.page';

@Component({
  selector: 'app-add-clinical',
  templateUrl: './add-clinical.page.html',
  styleUrls: ['./add-clinical.page.scss'],
})
export class AddClinicalPage implements OnInit {

  public user;

  clinicalProfileForm = new FormGroup({
    age_onset_disease                  : new FormControl('', Validators.required),
    duration_illness                   : new FormControl('', Validators.required),
    family_diabetes_history            : new FormControl('', Validators.required),
    associated_co_morbidities          : new FormControl('', Validators.required),
    current_hba                        : new FormControl('', Validators.required),
    current_insulin_dose               : new FormControl('', Validators.required),
    study_period_hospitalization       : new FormControl('', Validators.required),
    ketone_test_blood                  : new FormControl('', Validators.required),
    ketone_test_urine                  : new FormControl('', Validators.required),
    study_period_hospitalization_reason: new FormControl(''),
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
    });
  }

  get formControlsClinical(): any {
    return this.clinicalProfileForm['controls'];
  }

  clinicalProfileUpdate() {
    let  data     = this.clinicalProfileForm.value;
    data['token'] = this.user.token;
 
    this.loading.show();
    this.http.updateClinicalPorfile(data).subscribe(async (response) => {
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

  async viewClinical() {
    const modal = await this.modal.create({
      component: ViewClinicalPage,
    });
    return await modal.present();
  }

}
