import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsBeneficiaryPageRoutingModule } from './details-beneficiary-routing.module';

import { DetailsBeneficiaryPage } from './details-beneficiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsBeneficiaryPageRoutingModule
  ],
  declarations: [DetailsBeneficiaryPage]
})
export class DetailsBeneficiaryPageModule {}
