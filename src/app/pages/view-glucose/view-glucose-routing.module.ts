import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewGlucosePage } from './view-glucose.page';

const routes: Routes = [
  {
    path: '',
    component: ViewGlucosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewGlucosePageRoutingModule {}
