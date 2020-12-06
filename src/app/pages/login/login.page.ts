import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPasswordText = false;
  userType: string = 'beneficiary';
  deviceId:any;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private loading    : LoadingService,
    private toast      : ToastService,
    private authService: AuthenticationService,
    private router     : Router
  ) { }

  ngOnInit() {}

  toggleUser(ev: any) {
    this.userType = ev.detail.value;
  }

  login() {
    this.loading.show();

    let form         = this.loginForm.value;
    form['userType'] = this.userType;
    this.authService.login(form).subscribe(
      async (response) => {
        await this.loading.hide();
        if(response['status']==200) {       
          let data = response['data'];
          if(data.userType==='beneficiary') {
            this.router.navigateByUrl('/menu/dashboard-beneficiary', { replaceUrl: true });
          }
          if(data.userType==='doctor') {
            this.router.navigateByUrl('/menu/dashboard-doctor', { replaceUrl: true });
          }
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

  toSignUp() {
    this.router.navigateByUrl('signup');
  }

}
