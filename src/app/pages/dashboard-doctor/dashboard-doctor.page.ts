import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.page.html',
  styleUrls: ['./dashboard-doctor.page.scss'],
})
export class DashboardDoctorPage implements OnInit {

  public user;

  constructor(
    private router: Router,
    private auth  : AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.auth.getUser().then((data) => {    
      this.user = data;  
    });
  }

  toPage(page: string) {
    this.router.navigateByUrl(page, {replaceUrl: true});
  }

}
