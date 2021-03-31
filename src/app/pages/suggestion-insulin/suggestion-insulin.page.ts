import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/providers/loading.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-suggestion-insulin',
  templateUrl: './suggestion-insulin.page.html',
  styleUrls: ['./suggestion-insulin.page.scss'],
})
export class SuggestionInsulinPage implements OnInit {

  suggestions = [];
  notes = [];
  public user;

  constructor(
    private modal    : ModalController,
    private loading  : LoadingService,
    private http     : HttpService,
    private auth     : AuthenticationService,
    private navparams: NavParams
  ) {
    this.suggestions = this.navparams.get('suggestions');
  }

  ngOnInit() {
    this.user = this.auth.getUser().then((data) => {    
      this.user = data;  
    });
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true,componentProps: this.suggestions
    });
  }

  updateSuggestions(index,beneficiary_registration_id,suggestion_id,suggestion_unit,suggestion_status) {
    let  data                           = [];
    data['token']                       = this.user.token;
    data['beneficiary_registration_id'] = beneficiary_registration_id;
    data['suggestion_id']               = suggestion_id;
    data['suggestion_unit']             = suggestion_unit;
    data['suggestion_note']             = this.notes[index];
    data['suggestion_status']           = suggestion_status;
    data['date']                        = moment(new Date().toUTCString()).format('YYYY-MM-DD');

    this.loading.show();
    this.http.updateInsulinSuggestions(data).subscribe(async (response) => {
      await this.loading.hide();
      if(response['status'] == 200) {         
        this.suggestions = response['data'];
      }
    },async (error) => {
        await this.loading.hide();      
      }
    );    
  }
}
