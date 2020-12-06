import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardBeneficiaryPage } from './dashboard-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardBeneficiaryPageRoutingModule {}
