import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsulinFormPageRoutingModule } from './insulin-form-routing.module';

import { InsulinFormPage } from './insulin-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsulinFormPageRoutingModule
  ],
  declarations: [InsulinFormPage]
})
export class InsulinFormPageModule {}
