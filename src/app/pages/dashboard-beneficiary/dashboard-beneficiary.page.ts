import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard-beneficiary',
  templateUrl: './dashboard-beneficiary.page.html',
  styleUrls: ['./dashboard-beneficiary.page.scss'],
})
export class DashboardBeneficiaryPage implements OnInit {

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
