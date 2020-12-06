import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> {  
    return this.authService.isLoggedIn().then(isAuthenticated => {  
      if (isAuthenticated) {          
        return true;
      } else {          
        this.router.navigateByUrl('login', { replaceUrl: true });
        return false;
      }
    });
  }
}