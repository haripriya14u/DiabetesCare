import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddDietaryPageRoutingModule } from './add-dietary-routing.module';
import { AddDietaryPage } from './add-dietary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddDietaryPageRoutingModule
  ],
  declarations: [AddDietaryPage]
})
export class AddDietaryPageModule {}
