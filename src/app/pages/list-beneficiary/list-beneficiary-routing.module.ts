import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBeneficiaryPage } from './list-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: ListBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBeneficiaryPageRoutingModule {}
