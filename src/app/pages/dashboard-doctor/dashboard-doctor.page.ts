import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SuggestionInsulinPage } from '../suggestion-insulin/suggestion-insulin.page';
import * as moment from 'moment';
import { LoadingService } from 'src/app/providers/loading.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.page.html',
  styleUrls: ['./dashboard-doctor.page.scss'],
})
export class DashboardDoctorPage implements OnInit {

  public user;
  suggestions = [];
  insulin_range_id;

  constructor(
    private router   : Router,
    private auth     : AuthenticationService,
    private platform : Platform,
    private statusBar: StatusBar,    
    private loading    : LoadingService,
    private http       : HttpService,
    public  modal      : ModalController,
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#729fd7');
      this.statusBar.styleLightContent();
    });
    setTimeout(() => {      
      this.getInsulinSuggestions();
    },1000);
  }

  ngOnInit() {
    this.user = this.auth.getUser().then((data) => {    
      this.user = data;  
    });
  }

  toPage(page: string) {
    switch(page) {
      case 'beneficiaryList':
        this.router.navigateByUrl('/menu/list-beneficiary', {replaceUrl: true}); 
      break;
      case 'notifications':
        this.router.navigateByUrl('/menu/notifications', {replaceUrl: true}); 
      break;
      default:
      this.router.navigate(['/menu/list-beneficiary'], {
        replaceUrl: true,
        queryParams: { 'pageFrom': page }
      });
    }
  } 

  getInsulinSuggestions() {
    let  data     = [];
    data['token'] = this.user.token;
    data['date']  = moment(new Date().toUTCString()).format('YYYY-MM-DD');

    this.loading.show();
    this.http.getInsulinSuggestions(data).subscribe(async (response) => {
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
      componentProps: modalData
    });
    modal.onDidDismiss()
    .then((data) => { console.log(data['data']['componentProps']);
      this.suggestions = data['data']['componentProps']; 
  });
    return await modal.present();
  }

}
