import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { settings } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url       = settings.site_url;
  private publicKey = settings.public_key;

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  userRole = '';

  constructor(
    private http    : HttpClient,
    private storage : Storage,
  ) {
    this.isLoggedIn();
  }

  isLoggedIn(): Promise<any> {    
    return new Promise((resolve) => {
      this.storage.ready().then(() => {
        this.storage.get('user').then(res => {
          this.token =JSON.parse(res);            
          if (this.token) {
            this.isAuthenticated.next(true);
            resolve(true);
          } else {            
            this.isAuthenticated.next(false);
            resolve(false);
          }
        })
      });
    });
  }
 
  login(arrays: any): Observable<any> {
    let loginUrl = '';
    if(arrays['userType']=='beneficiary') {
        loginUrl = `${this.url}beneficiaryLogin`;
    }
    if(arrays['userType']=='doctor') {
        loginUrl = `${this.url}doctorLogin`;
    }
    let  data         = arrays;
    data['publicKey'] = this.publicKey;
    let  body         = this.jsonToURLEncoded(data);

    return this.http.post(loginUrl, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    }).pipe(
      map((response: any) => response),
      switchMap(res => {
        this.storage.set('user', JSON.stringify(res.data));
        return of(res);
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  getUserRole(): Promise<any> {    
    return new Promise((resolve) => {
      this.storage.ready().then(() => {
        this.storage.get('user').then(res => {
          let data =JSON.parse(res);
          this.userRole = data.userType;
          if (this.userRole) {
            resolve(this.userRole);
          } else {
            resolve(false);
          }
        })
      });
    });
  }

  getUser(): Promise<any> {    
    return new Promise((resolve) => {
      this.storage.ready().then(() => {
        this.storage.get('user').then(res => {
          let data =JSON.parse(res);
          if (data) {
            resolve(data);
          } else {
            resolve(false);
          }
        })
      });
    });
  }
 
  logout(): Promise<any> {    
    return new Promise((resolve) => {
      this.isAuthenticated.next(false);
      this.storage.remove('user');      
      resolve(true)
    });    
  }

  //convert a json object to the url encoded format of key=value&anotherkye=anothervalue
  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}
