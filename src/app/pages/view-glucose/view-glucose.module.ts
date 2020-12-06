import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewGlucosePageRoutingModule } from './view-glucose-routing.module';

import { ViewGlucosePage } from './view-glucose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewGlucosePageRoutingModule
  ],
  declarations: [ViewGlucosePage]
})
export class ViewGlucosePageModule {}
