import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { ManageSuperAdminsComponent } from './manage-super-admins/manage-super-admins.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { SearchPersonComponent } from './search-person/search-person.component';
import { ValidateVaccinationComponent } from './validate-vaccination/validate-vaccination.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vaccination-center', component: VaccinationCenterListComponent }, // Chemin vers le composant des centres de vaccination
  { path: 'manage-super-admins', component: ManageSuperAdminsComponent },
  { path: 'manage-admins', component: ManageAdminsComponent },
  { path: 'manage-doctors', component: ManageDoctorsComponent },
  { path: 'manage-reservations', component: ManageReservationsComponent },
  { path: 'search-person', component: SearchPersonComponent },
  { path: 'validate-vaccination', component: ValidateVaccinationComponent },
  { path: '**', redirectTo: '/home' } // Redirection en cas de chemin non reconnu
];
