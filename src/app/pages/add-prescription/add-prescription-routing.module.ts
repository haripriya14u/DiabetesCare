import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPrescriptionPage } from './add-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: AddPrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPrescriptionPageRoutingModule {}
