import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsulinFormPage } from './insulin-form.page';

const routes: Routes = [
  {
    path: '',
    component: InsulinFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsulinFormPageRoutingModule {}
