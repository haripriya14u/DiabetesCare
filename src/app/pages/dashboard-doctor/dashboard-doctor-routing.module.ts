import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDoctorPage } from './dashboard-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDoctorPageRoutingModule {}
