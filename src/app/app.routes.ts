import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para 'login' apenas quando não estiver já na rota
  { path: 'home', component: HomeComponent },
];

