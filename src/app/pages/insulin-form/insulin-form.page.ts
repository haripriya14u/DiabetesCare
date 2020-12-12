import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-insulin-form',
  templateUrl: './insulin-form.page.html',
  styleUrls: ['./insulin-form.page.scss'],
})
export class InsulinFormPage implements OnInit {

  suggestionForm: NgForm;

  beneficiary;
  user;
  suggestionDate;
  suggestionStatus;
  showIcon:boolean = true;

  public insulinSuggestions = [];

  constructor(
    public  modal    : ModalController,
    private http     : HttpService,
    private toast    : ToastService,
    private loading  : LoadingService,
    private alert    : AlertService,
    private navparams: NavParams,
    private platform : Platform,
    private statusBar: StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });     
    this.beneficiary = this.navparams.get('beneficiary');
    this.user        = this.navparams.get('user');  
    this.getInsulinSuggestions();
  }

  ngOnInit() {      
  }

  getInsulinSuggestions() {
    let  data                           = [];
    data['token']                       = this.user.token;
    data['beneficiary_registration_id'] = this.beneficiary.beneficiary_registration_id;

    this.http.getInsulinSuggestions(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.insulinSuggestions = data;
          this.suggestionDate     = this.insulinSuggestions[0].suggestion_date;
          this.suggestionStatus   = this.insulinSuggestions[0].suggestion_status;
        }
      } 
    },(error) => {
        console.log(error);
        this.toast.errorToast('Failed!, please try again later');
      }
    )
  }

  logForm(value, suggestionStatus='ACCEPTED') {
    let formData = [];

    formData['token']                       = this.user.token;
    formData['insulin_date']                = this.suggestionDate;
    formData['beneficiary_registration_id'] = this.beneficiary.beneficiary_registration_id;
    formData['insulin_units']               = value?JSON.stringify(value):[];
    formData['suggestion_status']           = suggestionStatus;
    
    this.loading.show();
    this.http.updateInsulinSuggestions(formData).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {   
        this.showIcon = false;        
        this.alert.show('Successfully submitted');
        this.dismissModal();
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

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true,
      'showIcon': this.showIcon
    });
  }

}
