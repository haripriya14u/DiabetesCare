import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details-beneficiary',
  templateUrl: './details-beneficiary.page.html',
  styleUrls: ['./details-beneficiary.page.scss'],
})
export class DetailsBeneficiaryPage implements OnInit {

  public user;
  public beneficiary;
  public pages = 'clinicalprofile';
  public clinicalProfileList;
  public glucoseLogList;
  public insulinLogList;
  public activityLogList;
  public tabList = [
    { 'tabName':'Clinical Profile', 'tabValue':'clinicalprofile' },
    { 'tabName':'Glucose Log', 'tabValue':'glucoselog' },
    { 'tabName':'Insulin Log', 'tabValue':'insulinlog' },
    { 'tabName':'Activity Log', 'tabValue':'activitylog' },    
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toast         : ToastService,
    private http          : HttpService,
    private authService   : AuthenticationService,
    private callNumber    : CallNumber,
    private storage       : Storage
  ) {    
    this.activatedRoute.queryParams.subscribe((beneficiary)=>{
      this.beneficiary = beneficiary;
    });
  }

  async ngOnInit() {        
    await this.storage.get('user').then(res => {
      this.user = JSON.parse(res);
    });
  }

  ionViewDidEnter() {    
    this.getClinicalPorfileData();
  }

  callBeneficiary(phone='') {
    if(phone) {
      this.callNumber.callNumber(phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => this.toast.errorToast('Connection failed, please try again later'));
    } else {
      this.toast.errorToast('Connection failed, please try again later');
    }
  }

  onSegmentChange() {
    let pages = this.pages;
    switch(pages) {
      case 'clinicalprofile':
        this.getClinicalPorfileData();
        break;
      case 'glucoselog':
        this.getGlucoseLogData();
        break;
      case 'insulinlog':
        this.getInsulinLogData();
        break;
      case 'activitylog':
          break;
    }
  }

  getClinicalPorfileData() {
    let  data                           = [];
    data['token']                       = this.user.token;
    data['beneficiary_registration_id'] = this.beneficiary.beneficiary_registration_id;

    this.http.getClinicalPorfile(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.clinicalProfileList = data.slice().reverse();
        } else {
          this.clinicalProfileList = [];
        }
      } 
    },(error) => {
        console.log(error);
        this.clinicalProfileList = [];
        this.toast.errorToast('Failed!, please try again later');
      }
    )
  }

  getGlucoseLogData() {
    let  data                           = [];
    data['token']                       = this.user.token;
    data['beneficiary_registration_id'] = this.beneficiary.beneficiary_registration_id;

    this.http.getGlucoseLog(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.glucoseLogList = data.slice().reverse();
        } else {
          this.glucoseLogList = [];
        }
      } 
    },(error) => {
        this.glucoseLogList = [];
        this.toast.errorToast('Failed, please try again later'); 
      }
    )
  }

  getInsulinLogData(){
    let  data                           = [];
    data['token']                       = this.user.token;
    data['beneficiary_registration_id'] = this.beneficiary.beneficiary_registration_id;

    this.http.getInsulinLog(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.insulinLogList = data.slice().reverse();
        } else {
          this.insulinLogList = [];
        }
      } 
    },(error) => {
      this.insulinLogList = [];
        this.toast.errorToast('Failed, please try again later');     
      }
    )
  }

  //ACCORDIAN
  toggleAccordian(event, index, list) {
    var element = event.target;
    element.classList.toggle("active");
    if(list[index].isActive) {
      list[index].isActive = false;
    } else {
      list[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}