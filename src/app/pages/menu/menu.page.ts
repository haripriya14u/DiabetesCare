import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LoadingService } from 'src/app/providers/loading.service';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  beneficiaryMenus      = [
    { name:'Home', icon:'assets/icon/home.svg', page:'/menu/dashboard-beneficiary' },
    { name:'My Profile', icon:'assets/icon/user.svg', page:'/menu/profile-beneficiary' },
    { name:'Clinical profile', icon:'assets/icon/medical-report.svg', page:'/menu/add-clinical' },
    { name:'Glucose Logbook', icon:'assets/icon/drop.svg', page:'/menu/add-glucose' },
    { name:'Insulin Logbook', icon:'assets/icon/health.svg', page:'/menu/add-insulin' },
    { name:'Dietary Logbook', icon:'assets/icon/diet.svg', page:'/menu/add-dietary' },
    { name:'Activity Logbook', icon:'assets/icon/bicycle.svg', page:'/menu/add-activity' },    
    { name:'Clinical Test Logbook', icon:'assets/icon/medical-history.svg', page:'/menu/clinical' },
    { name:'Ask My Doctor', icon:'assets/icon/stethoscope.svg', page:'/menu/ask-my-doctor' },
    { name:'Prescription', icon:'assets/icon/user.svg', page:'/menu/clinical' },
    { name:'Disease specific instructions', icon:'assets/icon/recipes.svg', page:'/menu/clinical' },
  ];

  doctorMenus = [
    { name:'Home', icon:'assets/icon/home.svg', page:'/menu/dashboard-doctor' },
    { name:'My Profile', icon:'assets/icon/user.svg', page:'/menu/profile-doctor' },
    { name:'Beneficiary List', icon:'assets/icon/group.svg', page:'/menu/list-clinical' },
    { name:'Clinical Test Logbook', icon:'assets/icon/medical-history.svg', page:'/menu/clinical' },
    { name:'Glucose Logbook', icon:'assets/icon/drop.svg', page:'/menu/clinical' },
    { name:'Medications', icon:'assets/icon/health.svg', page:'/menu/clinical' },
    { name:'Routine Activities', icon:'assets/icon/bicycle.svg', page:'/menu/clinical' },
    { name:'Beneficiary Query', icon:'assets/icon/stethoscope.svg', page:'/menu/clinical' },
  ];

  public user;
  currentMenu        = [];
  activePath: string = '';
  isLogged  :boolean = false;

  constructor(
    private router     : Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath  = event.url;      
      this.authService.isLoggedIn().then((data) => {this.isLogged = data;});      
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().then((data) => {
      this.isLogged = data; 
      if(this.isLogged) {    
        this.user = this.authService.getUser().then((data) => {    
          this.user = data;  
          console.log(this.user);
          if(this.user.userType==='beneficiary') {
            this.activePath  = '/menu/dashboard-beneficiary'; 
            this.currentMenu = this.beneficiaryMenus;
          }
          if(this.user.userType==='doctor') {
            this.activePath  = '/menu/dashboard-doctor'; 
            this.currentMenu = this.doctorMenus;
          }
        }); 
      } else {
        this.router.navigateByUrl('login', { replaceUrl: true }); 
      }
    });
  }

  toggleTheme(event) {
    if(event.detail.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  logout() {
    console.log('logout');
    this.authService.logout().then(() => {  
      this.isLogged = false;    
      this.router.navigateByUrl('login', { replaceUrl: true }); 
    });       
  }
}
