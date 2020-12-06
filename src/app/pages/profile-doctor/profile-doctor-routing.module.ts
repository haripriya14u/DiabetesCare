import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDoctorPage } from './profile-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileDoctorPageRoutingModule {}
