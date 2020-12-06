import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDoctorPageRoutingModule } from './profile-doctor-routing.module';

import { ProfileDoctorPage } from './profile-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDoctorPageRoutingModule
  ],
  declarations: [ProfileDoctorPage]
})
export class ProfileDoctorPageModule {}
