import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { settings } from '../settings';

@Injectable()
export class HttpService {

  private url         = settings.site_url;
  private publicToken = settings.public_key;
  
  constructor(private _http: HttpClient) { }

  getAppSettings(): Promise<any> {
    let  data         = [];
    data['publicKey'] = this.publicToken;
    let  body         = this.jsonToURLEncoded(data);

    return this._http.post(`${this.url}getAppSettings`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    }).toPromise();
  }

  registerDoctor(arrays: any) {
    let  data         = arrays;
    data['publicKey'] = this.publicToken;
    let  body         = this.jsonToURLEncoded(data);
    return this._http.post(`${this.url}doctorRegistration`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }
  
  registerBenifiary(arrays: any) {
    let  data         = arrays;
    data['publicKey'] = this.publicToken;
    let  body         = this.jsonToURLEncoded(data);
    return this._http.post(`${this.url}beneficiaryRegistration`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  updateDoctor(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}updateDoctor`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  updateBenifiary(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}updateBenifiary`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getClinicalPorfile(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getClinicalPorfile`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getBeneficiaryByDoctorId(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getBeneficiaryByDoctorId`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getGlucoseRange(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getGlucoseRangeDetails`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }    

  getGlucoseLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getGlucoseLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  updateClinicalPorfile(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}updateClinicalPorfile`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  addGlucoseLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}addGlucoseLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getInsulinRanges(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getInsulinRanges`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getInsulinTypes(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getInsulinTypes`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getAccepetedSuggestions(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getAccepetedSuggestions`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  addInsulinLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}addInsulinLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getInsulinLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getInsulinLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getInsulinSuggestions(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getInsulinSuggestions`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  updateInsulinSuggestions(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}updateInsulinSuggestions`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getUserDetails(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}beneficiary`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getBeneficiaryGlucose(arrays: any) {
    return this._http.get(`${this.url}beneficiaryGlucose`, { params: arrays });
  }

  getBeneficiaryActivity(arrays: any) {
    return this._http.get(`${this.url}routineActivity`, { params: arrays });
  }

  getBeneficiaryMedication(arrays: any) {
    return this._http.get(`${this.url}beneficiaryMedication`, { params: arrays });
  }

  addBeneficiaryGlucose(arrays: any)  {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}beneficiaryGlucose`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  addBeneficiaryActivity(arrays: any)  {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}routineActivity`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  addActivityLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}addActivityLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }
  
  getactivityLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getactivityLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getDietaryRange(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getDietaryRange`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getDietaryItems(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getDietaryItems`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  addDietaryLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}addDietaryLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getDietaryLog(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getDietaryLog`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  sendMessage(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}sendMessage`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  getMessages(arrays: any) {
    let body = this.jsonToURLEncoded(arrays);
    return this._http.post(`${this.url}getMessages`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;')
    });
  }

  //convert a json object to the url encoded format of key=value&anotherkye=anothervalue
  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}