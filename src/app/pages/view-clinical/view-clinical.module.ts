import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClinicalPageRoutingModule } from './view-clinical-routing.module';

import { ViewClinicalPage } from './view-clinical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClinicalPageRoutingModule
  ],
  declarations: [ViewClinicalPage]
})
export class ViewClinicalPageModule {}
