import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBeneficiaryPageRoutingModule } from './list-beneficiary-routing.module';

import { ListBeneficiaryPage } from './list-beneficiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBeneficiaryPageRoutingModule
  ],
  declarations: [ListBeneficiaryPage]
})
export class ListBeneficiaryPageModule {}
