import { Routes } from '@angular/router';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/centers', pathMatch: 'full' },
  { path: 'centers', component: VaccinationCenterListComponent },
  { path: 'login', component: LoginComponent },
];
