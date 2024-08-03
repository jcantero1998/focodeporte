import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.DashboardComponent),
    title: 'Inicio',
    data: {
      icon: 'home'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('.//pages/contact-form/contact-form.component').then((c) => c.AddressFormComponent),
    title: 'Contacto',
    data: {
      icon: 'email'
    }
  }
];
