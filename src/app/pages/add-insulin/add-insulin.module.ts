import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInsulinPageRoutingModule } from './add-insulin-routing.module';

import { AddInsulinPage } from './add-insulin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInsulinPageRoutingModule
  ],
  declarations: [AddInsulinPage]
})
export class AddInsulinPageModule {}
