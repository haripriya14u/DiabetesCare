import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClinicalPage } from './view-clinical.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClinicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClinicalPageRoutingModule {}
