import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClinicalPageRoutingModule } from './add-clinical-routing.module';

import { AddClinicalPage } from './add-clinical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddClinicalPageRoutingModule
  ],
  declarations: [AddClinicalPage]
})
export class AddClinicalPageModule {}
