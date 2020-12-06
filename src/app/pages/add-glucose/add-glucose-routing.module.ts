import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGlucosePage } from './add-glucose.page';

const routes: Routes = [
  {
    path: '',
    component: AddGlucosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGlucosePageRoutingModule {}
