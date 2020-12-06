import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardBeneficiaryPageRoutingModule } from './dashboard-beneficiary-routing.module';

import { DashboardBeneficiaryPage } from './dashboard-beneficiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardBeneficiaryPageRoutingModule
  ],
  declarations: [DashboardBeneficiaryPage]
})
export class DashboardBeneficiaryPageModule {}
