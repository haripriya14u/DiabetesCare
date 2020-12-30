import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    { name:'Activity Logbook', icon:'assets/icon/bicycle.svg', page:'/menu/add-activity' },
    { name:'Dietary Logbook', icon:'assets/icon/diet.svg', page:'/menu/add-dietary' },    
    { name:'Ask My Doctor', icon:'assets/icon/stethoscope.svg', page:'/menu/ask-my-doctor' },
    { name:'Prescription', icon:'assets/icon/user.svg', page:'/menu/view-prescription' },
    { name:'Notification', icon:'assets/icon/warning.svg', page:'/menu/notifications' },
  ];

  doctorMenus = [
    { name:'Home', icon:'assets/icon/home.svg', page:'dashboard-doctor' },
    { name:'My Profile', icon:'assets/icon/user.svg', page:'profile-doctor' },
    { name:'Beneficiary List', icon:'assets/icon/group.svg', page:'beneficiaryList' },
    { name:'Glucose Logbook', icon:'assets/icon/drop.svg', page:'glucoseLog' },
    { name:'Prescription', icon:'assets/icon/health.svg', page:'prescription' },
    { name:'Notification', icon:'assets/icon/warning.svg', page:'notifications' },
    { name:'Quick contact', icon:'assets/icon/stethoscope.svg', page:'quickContact' },
    { name:'Chat', icon:'assets/icon/question.svg', page:'chat' },
  ];

  public user;
  currentMenu        = [];
  activePath: string = '';
  isLogged  :boolean = false;

  constructor(
    private router     : Router,
    private auth       : AuthenticationService,
    private authService: AuthenticationService
  ) {
    this.user = this.auth.getUser().then((data) => {    
      this.user = data;  
    });
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

  logout() {
    console.log('logout');
    this.authService.logout().then(() => {  
      this.isLogged = false;    
      this.router.navigateByUrl('login', { replaceUrl: true }); 
    });       
  }

  toPage(page: string) {
    switch(page) {
      case 'beneficiaryList':
        this.router.navigateByUrl('/menu/list-beneficiary', {replaceUrl: true}); 
      break;
      case 'dashboard-doctor':
        this.router.navigateByUrl('/menu/dashboard-doctor', {replaceUrl: true}); 
      break;
      default:
      this.router.navigate(['/menu/list-beneficiary'], {
        replaceUrl: true,
        queryParams: { 'pageFrom': page }
      });
    }
  }
}
