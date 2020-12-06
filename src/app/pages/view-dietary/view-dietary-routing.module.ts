import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDietaryPage } from './view-dietary.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDietaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDietaryPageRoutingModule {}
