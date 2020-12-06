import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDoctorPageRoutingModule } from './dashboard-doctor-routing.module';

import { DashboardDoctorPage } from './dashboard-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDoctorPageRoutingModule
  ],
  declarations: [DashboardDoctorPage]
})
export class DashboardDoctorPageModule {}
