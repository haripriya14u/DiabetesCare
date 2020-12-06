import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskMyDoctorPage } from './ask-my-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: AskMyDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskMyDoctorPageRoutingModule {}
