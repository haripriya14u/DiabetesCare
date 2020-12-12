import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDietaryPage } from './search-dietary.page';

const routes: Routes = [
  {
    path: '',
    component: SearchDietaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDietaryPageRoutingModule {}
