import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () =>
    import('./view/main-page/main-page').then(
        c => c.MainPage
    )
  },
  {
    path:'register',
    loadComponent: ()=>
      import('./view/register/register').then(
        c=>c.Register
      )
  },
  {
    path:'login',
    loadComponent:() =>
      import('./pages/login/login').then(
        c=>c.Login
      )
  },
  {
    path:'header',
    loadComponent:()=>
      import('./view/header/header').then(
        c=>c.Header
      )
  },


];
