import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [      
      {
        path: 'add-activity',
        loadChildren: () => import('../add-activity/add-activity.module').then( m => m.AddActivityPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-clinical',
        loadChildren: () => import('../add-clinical/add-clinical.module').then( m => m.AddClinicalPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-dietary',
        loadChildren: () => import('../add-dietary/add-dietary.module').then( m => m.AddDietaryPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-glucose',
        loadChildren: () => import('../add-glucose/add-glucose.module').then( m => m.AddGlucosePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-insulin',
        loadChildren: () => import('../add-insulin/add-insulin.module').then( m => m.AddInsulinPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'ask-my-doctor',
        loadChildren: () => import('../ask-my-doctor/ask-my-doctor.module').then( m => m.AskMyDoctorPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard-beneficiary',
        loadChildren: () => import('../dashboard-beneficiary/dashboard-beneficiary.module').then( m => m.DashboardBeneficiaryPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard-doctor',
        loadChildren: () => import('../dashboard-doctor/dashboard-doctor.module').then( m => m.DashboardDoctorPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile-beneficiary',
        loadChildren: () => import('../profile-beneficiary/profile-beneficiary.module').then( m => m.ProfileBeneficiaryPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile-doctor',
        loadChildren: () => import('../profile-doctor/profile-doctor.module').then( m => m.ProfileDoctorPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-activity',
        loadChildren: () => import('../view-activity/view-activity.module').then( m => m.ViewActivityPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-clinical',
        loadChildren: () => import('../view-clinical/view-clinical.module').then( m => m.ViewClinicalPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-dietary',
        loadChildren: () => import('../view-dietary/view-dietary.module').then( m => m.ViewDietaryPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-glucose',
        loadChildren: () => import('../view-glucose/view-glucose.module').then( m => m.ViewGlucosePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-insulin',
        loadChildren: () => import('../view-insulin/view-insulin.module').then( m => m.ViewInsulinPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-beneficiary',
        loadChildren: () => import('../list-beneficiary/list-beneficiary.module').then( m => m.ListBeneficiaryPageModule)
      },
      {
        path: 'details-beneficiary',
        loadChildren: () => import('../details-beneficiary/details-beneficiary.module').then( m => m.DetailsBeneficiaryPageModule)
      },
      {
        path: 'suggestion-insulin',
        loadChildren: () => import('../suggestion-insulin/suggestion-insulin.module').then( m => m.SuggestionInsulinPageModule)
      },
      {
        path: 'insulin-form',
        loadChildren: () => import('../insulin-form/insulin-form.module').then( m => m.InsulinFormPageModule)
      },
      {
        path: 'search-dietary',
        loadChildren: () => import('../search-dietary/search-dietary.module').then( m => m.SearchDietaryPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'add-prescription',
        loadChildren: () => import('../add-prescription/add-prescription.module').then( m => m.AddPrescriptionPageModule)
      },
      {
        path: 'view-prescription',
        loadChildren: () => import('../view-prescription/view-prescription.module').then( m => m.ViewPrescriptionPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
