import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileBeneficiaryPageRoutingModule } from './profile-beneficiary-routing.module';

import { ProfileBeneficiaryPage } from './profile-beneficiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileBeneficiaryPageRoutingModule
  ],
  declarations: [ProfileBeneficiaryPage]
})
export class ProfileBeneficiaryPageModule {}
