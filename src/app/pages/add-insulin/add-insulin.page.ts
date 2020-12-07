import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { ViewInsulinPage } from '../view-insulin/view-insulin.page';

@Component({
  selector: 'app-add-insulin',
  templateUrl: './add-insulin.page.html',
  styleUrls: ['./add-insulin.page.scss'],
})
export class AddInsulinPage implements OnInit {

  public user;

  period = [];
  types  = [];

  public date      = new Date();
  myDate: String   = this.date.toISOString();
  myTime: String   = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();

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
    public  form       : FormBuilder
  ) { }

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
      insulin_unit_value: new FormControl(1, Validators.required),
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

    this.loading.show();
    this.http.getInsulinTypes(data).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {         
        this.types = response['data'];
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
    this.addInsulinForm();
  }
    
  insulinFormUpdate() {
    let data     = this.insulinForm.value; 
    let formData = [];

    formData['token']            = this.user.token;
    formData['insulin_date']     = data['insulin_date'];
    formData['insulin_range_id'] = data['insulin_range_id'];
    formData['insulin_time']     = data['insulin_time'];
    formData['insulin_units']    = JSON.stringify(data['insulin_units']);
    
    this.loading.show();
    this.http.addInsulinLog(formData).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {   
        this.insulinForm.reset();        
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
