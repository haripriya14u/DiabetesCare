import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDietaryPageRoutingModule } from './view-dietary-routing.module';

import { ViewDietaryPage } from './view-dietary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDietaryPageRoutingModule
  ],
  declarations: [ViewDietaryPage]
})
export class ViewDietaryPageModule {}
