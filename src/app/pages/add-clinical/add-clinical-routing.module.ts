import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClinicalPage } from './add-clinical.page';

const routes: Routes = [
  {
    path: '',
    component: AddClinicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClinicalPageRoutingModule {}
