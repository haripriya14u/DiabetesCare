import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public myForm: string;

  showBeneficiaryPasswordText = false;
  showPasswordText            = false;
  userFormAlert;

  doctorForm = new FormGroup({
    doctor_full_name  : new FormControl('', Validators.required),
    doctor_gender     : new FormControl('', Validators.required),
    doctor_phone      : new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    doctor_designation: new FormControl('', Validators.required),
    doctor_hospital   : new FormControl('', Validators.required),
    doctor_login_id   : new FormControl('', Validators.required),
    doctor_password   : new FormControl('', [Validators.required,Validators.minLength(8)]),
    address_line_1    : new FormControl('', Validators.required),
    address_line_2    : new FormControl(''),
    state_name        : new FormControl('', Validators.required),
    district_name     : new FormControl('', Validators.required),
    country           : new FormControl('', Validators.required),
  });

  beneficiaryForm = new FormGroup({
    beneficiary_name          : new FormControl('', Validators.required),
    beneficiary_gender        : new FormControl('', Validators.required),
    beneficiary_phone         : new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    beneficiary_dob           : new FormControl('', Validators.required),
    beneficiary_weight        : new FormControl('', Validators.required),
    beneficiary_height        : new FormControl('', Validators.required),
    beneficiary_login_id      : new FormControl('', Validators.required),
    beneficiary_password      : new FormControl('', [Validators.required,Validators.minLength(8)]),
    address_line_1        : new FormControl('', Validators.required),
    address_line_2        : new FormControl(''),
    state_name            : new FormControl('', Validators.required),
    district_name         : new FormControl('', Validators.required),
    country               : new FormControl('', Validators.required),
  });

  constructor(
    private alertCtrl: AlertController,
    private loading  : LoadingService,
    private toast    : ToastService,
    private alert    : AlertService,
    private http     : HttpService,
    private platform : Platform,
    private statusBar: StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });
  }

  ngOnInit() {
    this.showForm();
  }

  async showForm() {
    this.userFormAlert = await this.alertCtrl.create({
      header: 'Signup as ',
      backdropDismiss: false,
      inputs: [
        {
          name: 'userType',
          type: 'radio',
          label: 'Beneficiary',
          value: 'beneficiary',
          checked: true
        },
        {
          name: 'userType',
          type: 'radio',
          label: 'Doctor',
          value: 'doctor'
        },        
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: (data) => {
            this.myForm = data;
          }
        }
      ]
    });
    await this.userFormAlert.present();    
  }

  getDefault(value): any {
    return this.myForm == value ? true : false;
  }

  get formControls(): any {
    return this.beneficiaryForm['controls'];
  }

  get formControlsDoctor(): any {
    return this.doctorForm['controls'];
  }

  benefiaryRegistration() {
    this.loading.show();
    let  data = this.beneficiaryForm.value;
    this.http.registerBenifiary(data).subscribe(
      async (response) => {
        await this.loading.hide();
        if(response['status']==200) {  
          this.alert.showWithTitle('Success',response['message']);
        } else {
          this.toast.errorToast(response['message']);
        }
      },
      async (error) => { 
        await this.loading.hide();
        this.toast.errorToast('Failed, please try again later');        
      }
    );
  }

  doctorRegistration() {
    this.loading.show();
    let  data = this.doctorForm.value;
    this.http.registerDoctor(data).subscribe(
      async (response) => {
        await this.loading.hide();
        if(response['status']==200) {  
          this.alert.showWithTitle('Success',response['message']);
        } else {
          this.toast.errorToast(response['message']);
        }
      },
      async (error) => { 
        await this.loading.hide();
        this.toast.errorToast('Failed, please try again later');        
      }
    );
  }

  ionViewWillLeave() {
    try {
      this.userFormAlert.dismiss();
    } catch(e) {}
  }

}
