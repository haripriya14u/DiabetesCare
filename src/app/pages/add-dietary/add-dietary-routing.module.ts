import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDietaryPage } from './add-dietary.page';

const routes: Routes = [
  {
    path: '',
    component: AddDietaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDietaryPageRoutingModule {}
