import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewGlucosePageRoutingModule } from './view-glucose-routing.module';
import { ViewGlucosePage } from './view-glucose.page';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    ViewGlucosePageRoutingModule
  ],
  declarations: [ViewGlucosePage]
})
export class ViewGlucosePageModule {}
