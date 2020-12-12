import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchDietaryPageRoutingModule } from './search-dietary-routing.module';

import { SearchDietaryPage } from './search-dietary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchDietaryPageRoutingModule
  ],
  declarations: [SearchDietaryPage]
})
export class SearchDietaryPageModule {}
