import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileBeneficiaryPage } from './profile-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileBeneficiaryPageRoutingModule {}
