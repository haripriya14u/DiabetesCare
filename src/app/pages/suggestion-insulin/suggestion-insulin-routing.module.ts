import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestionInsulinPage } from './suggestion-insulin.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestionInsulinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionInsulinPageRoutingModule {}
