import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsBeneficiaryPage } from './details-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsBeneficiaryPageRoutingModule {}
