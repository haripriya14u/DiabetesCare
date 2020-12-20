import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { SuggestionInsulinPage } from '../suggestion-insulin/suggestion-insulin.page';
import { ViewInsulinPage } from '../view-insulin/view-insulin.page';
import * as moment from 'moment';

@Component({
  selector: 'app-add-insulin',
  templateUrl: './add-insulin.page.html',
  styleUrls: ['./add-insulin.page.scss'],
})
export class AddInsulinPage implements OnInit {

  public user;

  period      = [];
  types       = [];
  suggestions = [];

  public date      = new Date();
  myDate: String   = this.date.toUTCString();
  myTime: String   = this.date.toUTCString();

  insulinForm = new FormGroup({
    insulin_date    : new FormControl(this.myDate, Validators.required),
    insulin_time    : new FormControl(this.myTime, Validators.required),
    insulin_range_id: new FormControl('', Validators.required),
    insulin_units   : this.form.array([]),
  });

  constructor(
    private authService: AuthenticationService,
    private loading    : LoadingService,
    private toast      : ToastService,
    private alert      : AlertService,
    private http       : HttpService,
    public  modal      : ModalController,
    public  form       : FormBuilder,
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
      this.getInsulinRanges();
    });
  }

  get insulinUnitForms() {
    return this.insulinForm.get('insulin_units') as FormArray;
  }

  addInsulinForm() {
    const insulinValueForm = new FormGroup({
      insulin_type_id   : new FormControl('', Validators.required),
      insulin_unit_value: new FormControl('', [Validators.required,Validators.min(1)]),
    });
    this.insulinUnitForms.push(insulinValueForm);
  }

  deleteInsulinForm(i) {
    this.insulinUnitForms.removeAt(i);
  }

  get formControlsInsulin(): any {
    return this.insulinForm['controls'];
  }

  getInsulinRanges() {
    let  data         = [];
    data['token']     = this.user.token;

    this.http.getInsulinRanges(data).subscribe((response) => {
      if(response['status'] == 200) {         
        this.period = response['data'];
      } else if(response['status'] == 202) {
        this.toast.errorToast(response['message']);
      } else {
        this.toast.errorToast('Failed!, please try again later')
      }
    },(error) => {   
        this.toast.errorToast('Failed, Please try again later');      
      }
    );
    this.getInsulinTypes();
  }

  getInsulinTypes() {
    let  data         = [];
    data['token']     = this.user.token;

    this.http.getInsulinTypes(data).subscribe((response) => {
      if(response['status'] == 200) {         
        this.types = response['data'];        
        this.getAccepetedSuggestions();
      } else if(response['status'] == 202) {
        this.toast.errorToast(response['message']);
      } else {
        this.toast.errorToast('Failed!, please try again later')
      }
    },async (error) => {  
        this.toast.errorToast('Failed, Please try again later');      
      }
    );
    this.addInsulinForm();
  }

  getAccepetedSuggestions() {
    let  data         = [];
    data['token']     = this.user.token;

    this.loading.show();
    this.http.getAccepetedSuggestions(data).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {         
        this.suggestions = response['data'];
      }
    },async (error) => {
        await this.loading.hide();      
      }
    );
  }

  async showSuggestions() {
    let modalData = {
      suggestions: this.suggestions,
    };    
    const modal = await this.modal.create({
      component: SuggestionInsulinPage, 
      cssClass: 'customModal',
      componentProps: modalData
    });
    return await modal.present();
  }
    
  insulinFormUpdate() {
    let data     = this.insulinForm.value; 
    let formData = [];

    formData['token']            = this.user.token;
    formData['insulin_range_id'] = data['insulin_range_id'];

    this.period.forEach(period => {
      if(period.insulin_range_id == data['insulin_range_id']){
        formData['insulin_time_period'] = period.insulin_period;
      }
    });

    data['insulin_units'].forEach(insulin_unit => {
      this.types.forEach(type => {
        if(type.insulin_type_id == insulin_unit['insulin_type_id']){
          insulin_unit['insulin_name'] = type.insulin_type;
        }
      });
    });
    formData['insulin_units'] = JSON.stringify(data['insulin_units']);

    let date = moment(new Date(this.insulinForm.value.insulin_date)).format('YYYY-MM-DD');
    let time = moment(new Date(this.insulinForm.value.insulin_time)).format('HH:mm:ss');
    formData['insulin_datetime'] = moment(date+' '+time).utc().format('YYYY-MM-DD HH:mm:ss');
    
    this.loading.show();
    this.http.addInsulinLog(formData).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {   
        this.insulinForm.reset();  
        this.insulinForm.patchValue({
          insulin_date    : this.myDate,
          insulin_time    : this.myTime,
        });      
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
    )
  }

  async viewInsulin() {
    const modal = await this.modal.create({
      component: ViewInsulinPage,
    });
    return await modal.present();
  }

}
