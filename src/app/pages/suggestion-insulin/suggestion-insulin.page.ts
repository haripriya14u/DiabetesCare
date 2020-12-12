import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-suggestion-insulin',
  templateUrl: './suggestion-insulin.page.html',
  styleUrls: ['./suggestion-insulin.page.scss'],
})
export class SuggestionInsulinPage implements OnInit {

  suggestions = [];

  constructor(
    private modal: ModalController,
    private navparams: NavParams
  ) {
    this.suggestions = this.navparams.get('suggestions');
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true,
    });
  }
}
