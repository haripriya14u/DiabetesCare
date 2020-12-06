import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGlucosePageRoutingModule } from './add-glucose-routing.module';

import { AddGlucosePage } from './add-glucose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGlucosePageRoutingModule
  ],
  declarations: [AddGlucosePage]
})
export class AddGlucosePageModule {}
