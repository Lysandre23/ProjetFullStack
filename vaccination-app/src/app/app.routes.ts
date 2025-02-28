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
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { ManageCentersComponent } from './manage-centers/manage-centers.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationsComponent } from './reservations/reservations.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CenterCreationComponent } from './center-creation/center-creation.component';
import { CenterEditComponent } from './center-edit/center-edit.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'vaccination-center', component: VaccinationCenterListComponent }, // Chemin vers le composant des centres de vaccination
  { path: 'manage-super-admins', component: ManageSuperAdminsComponent },
  { path: 'manage-admins', component: ManageAdminsComponent },
  { path: 'manage-centers', component: ManageCentersComponent },
  { path: 'manage-doctors', component: ManageDoctorsComponent },
  { path: 'manage-reservations', component: ManageReservationsComponent },
  { path: 'search-person', component: SearchPersonComponent },
  { path: 'validate-vaccination', component: ValidateVaccinationComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'manage-doctors/edit/:id', component: EditDoctorComponent },
  { path: 'create-center', component: CenterCreationComponent, canActivate: [authGuard] },
  { path: 'edit-center/:id', component: CenterEditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' } // Redirection en cas de chemin non reconnu
];
