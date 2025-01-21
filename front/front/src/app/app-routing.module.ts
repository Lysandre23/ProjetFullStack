import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'search', component: HomeComponent }, // Exemple
  { path: 'register', component: HomeComponent }, // Exemple
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import des routes principales
  exports: [RouterModule], // Export pour le rendre accessible
})
export class AppRoutingModule {}
