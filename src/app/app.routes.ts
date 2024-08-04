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
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then((c) => c.ServicesComponent),
    title: 'Servicios',
    data: {
      icon: 'work'
    }
  },
  {
    path: 'about-me',
    loadComponent: () => import('./pages/about-me/about-me.component').then((c) => c.AboutMeComponent),
    title: 'Sobre mí',
    data: {
      icon: 'account_box'
    }
  },
  {
    path: 'contact-form',
    loadComponent: () => import('.//pages/contact-form/contact-form.component').then((c) => c.AddressFormComponent),
    title: 'Contacto',
    data: {
      icon: 'email'
    }
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then((c) => c.BlogComponent),
    title: 'Blog',
    data: {
      icon: 'chat'
    }
  },
];
