import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInsulinPageRoutingModule } from './add-insulin-routing.module';

import { AddInsulinPage } from './add-insulin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddInsulinPageRoutingModule
  ],
  declarations: [AddInsulinPage]
})
export class AddInsulinPageModule {}
