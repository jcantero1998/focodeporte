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
      icon: 'home',
      display: true
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then((c) => c.ServicesComponent),
    title: 'Servicios',
    data: {
      icon: 'work',
      display: true
    }
  },
  {
    path: 'about-me',
    loadComponent: () => import('./pages/about-me/about-me.component').then((c) => c.AboutMeComponent),
    title: 'Sobre mí',
    data: {
      icon: 'account_box',
      display: true
    }
  },
  {
    path: 'contact-form',
    loadComponent: () => import('.//pages/contact-form/contact-form.component').then((c) => c.AddressFormComponent),
    title: 'Contacto',
    data: {
      icon: 'email',
      display: true
    }
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.component').then((c) => c.PostsComponent),
    title: 'Posts',
    data: {
      icon: 'chat',
      display: true
    }
  },
  {
    path: 'new-post',
    loadComponent: () => import('./pages/new-post/new-post.component').then((c) => c.NewPostComponent),
    title: 'Añadir Post',
    data: {
      icon: 'chat',
      display: false
    }
  },
  {
    path: 'edit-post/:id',
    loadComponent: () => import('./pages/new-post/new-post.component').then((c) => c.NewPostComponent),
    title: 'Editar Post',
    data: {
      icon: 'chat',
      display: false
    }
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./pages/post-detail/post-detail.component').then((c) => c.PostDetailComponent),
    title: 'Detalle del Post',
    data: {
      icon: 'article',
      display: false
    }
  },
];
