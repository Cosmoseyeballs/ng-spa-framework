import { Routes } from '@angular/router';

import { DashboardComponent  } from './dashboard/dashboard.component';
import { CountryListComponent  } from './country-list/country-list.component';
import { CountryDetailComponent  } from './country-detail/country-detail.component';
import { CountryMaintComponent  } from './country-maint/country-maint.component';

import { SettingsComponent } from './settings/settings.component';
import { AuthenticatedUserComponent } from "app/authenticated-user/authenticated-user.component";
import { SignInComponent } from "fw/users/sign-in/sign-in.component";
//Dashboard Countries Settings
export const appRoutes: Routes= [  
  { path: 'signin', component: SignInComponent },
//   { path: 'register', component: RegisterUserComponent },
  { path: 'authenticated', component: AuthenticatedUserComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'country-list/:count', component: CountryListComponent },
          { path: 'country-detail/:country', component: CountryDetailComponent },
          { path: 'country-maint', component: CountryMaintComponent },
          { path: 'settings', component: SettingsComponent },
        ] },
  { path: '', component: SignInComponent },
  { path: '**', component: SignInComponent }
];