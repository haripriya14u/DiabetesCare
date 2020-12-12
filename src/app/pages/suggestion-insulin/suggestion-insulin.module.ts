import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionInsulinPageRoutingModule } from './suggestion-insulin-routing.module';

import { SuggestionInsulinPage } from './suggestion-insulin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestionInsulinPageRoutingModule
  ],
  declarations: [SuggestionInsulinPage]
})
export class SuggestionInsulinPageModule {}
