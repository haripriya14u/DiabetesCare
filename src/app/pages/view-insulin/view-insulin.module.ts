import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewInsulinPageRoutingModule } from './view-insulin-routing.module';
import { ViewInsulinPage } from './view-insulin.page';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    ViewInsulinPageRoutingModule
  ],
  declarations: [ViewInsulinPage]
})
export class ViewInsulinPageModule {}
