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
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.component').then((c) => c.PostsComponent),
    title: 'Posts',
    data: {
      icon: 'chat'
    }
  },
  {
    path: 'new-post',
    loadComponent: () => import('./pages/new-post/new-post.component').then((c) => c.NewPostComponent),
    title: 'Añadir Post',
    data: {
      icon: 'chat'
    }
  },
  {
    path: 'edit-post/:id',
    loadComponent: () => import('./pages/new-post/new-post.component').then((c) => c.NewPostComponent),
    title: 'Editar Post',
    data: {
      icon: 'chat'
    }
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./pages/post-detail/post-detail.component').then((c) => c.PostDetailComponent),
    title: 'Detalle del Post',
    data: {
      icon: 'article'
    }
  },
];
