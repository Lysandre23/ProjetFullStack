import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ManageCentersComponent } from './admin/manage-centers/manage-centers.component';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { ManageDoctorsComponent } from './admin/manage-doctors/manage-doctors.component';
import { ManageReservationsComponent } from './admin/manage-reservations/manage-reservations.component';
import { SearchPatientComponent } from './doctor/search-patient/search-patient.component';
import { ValidateVaccinationComponent } from './doctor/validate-vaccination/validate-vaccination.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
