import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> {    
    return this.authService.isLoggedIn().then((isAuthenticated) => {      
      if (isAuthenticated) {   
        this.authService.getUserRole().then((data) => { 
          if(data==='beneficiary') {           
            this.router.navigateByUrl('menu/dashboard-beneficiary', { replaceUrl: true });
          }
          if(data==='doctor') {           
            this.router.navigateByUrl('menu/dashboard-doctor', { replaceUrl: true });
          }
        });
      }        
      return true;      
    });  
  }
  
}
