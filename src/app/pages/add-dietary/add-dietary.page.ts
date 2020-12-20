import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { SearchDietaryPage } from '../search-dietary/search-dietary.page';
import { ViewDietaryPage } from '../view-dietary/view-dietary.page';
import * as moment from 'moment';

@Component({
  selector: 'app-add-dietary',
  templateUrl: './add-dietary.page.html',
  styleUrls: ['./add-dietary.page.scss'],
})
export class AddDietaryPage implements OnInit {
  
  public user;

  period = [];
  addedItems = [];
  date = new Date();
  myDate: String = this.date.toUTCString();
  myTime: String = this.date.toUTCString();

  dietaryForm = new FormGroup({
    dietary_date    : new FormControl(this.myDate, Validators.required),
    dietary_time    : new FormControl(this.myTime, Validators.required),
    dietary_range_id: new FormControl('', Validators.required),
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
      this.getDietaryRanges();
    });
  }

  get formControlsDietary(): any {
    return this.dietaryForm['controls'];
  }

  getDietaryRanges() {
    let  data         = [];
    data['token']     = this.user.token;

    this.loading.show();
    this.http.getDietaryRange(data).subscribe(async (response) => {
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

  async searchDietary() {
    const modal = await this.modal.create({
      component: SearchDietaryPage,
    });
    await modal.present();
    await modal.onWillDismiss().then((res) => {
      let item = res.data;
      if(item && item['dietary_quantity'] > 0) {
        this.addedItems.push(item);
      }
    });
  }

  removeAddedItems(item) {
    this.addedItems.splice(this.addedItems.findIndex(function(i){
      return i.dietary_item_id === item.dietary_item_id;
    }), 1);
  }

  dietaryFormUpdate() {
    if(this.addedItems.length>0) {
      let  data             = this.dietaryForm.value;
      data['token']         = this.user.token;
      data['dietary_items'] = JSON.stringify(this.addedItems);

      this.period.forEach(period => {
        if(period.dietary_range_id == data['dietary_range_id']){
          data['period_dietary'] = period.dietary_period;
        }
      });

      let date = moment(new Date(this.dietaryForm.value.dietary_date)).format('YYYY-MM-DD');
      let time = moment(new Date(this.dietaryForm.value.dietary_time)).format('HH:mm:ss');
      data['dietary_datetime'] = moment(date+' '+time).utc().format('YYYY-MM-DD HH:mm:ss');

      this.loading.show();
      this.http.addDietaryLog(data).subscribe(async (response) => {
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
    } else {
      this.toast.errorToast('Please add dietary items');      
    }
  }

  async viewDietary() {
    const modal = await this.modal.create({
      component: ViewDietaryPage,
    });
    return await modal.present();
  }
}
