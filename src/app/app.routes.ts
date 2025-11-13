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
    path:'business_post',
    loadComponent:() =>
      import('./view/business_post/business_post').then(
        c=>c.Business_Post
      )
  },

   {
    path:'business_show',
    loadComponent:() =>
      import('./view/business_show/business_show').then(
        c=>c.BusinessShow
      )
  },

   {
    path:'business_comments',
    loadComponent:() =>
      import('./view/business_comments/business_comments').then(
        c=>c.BusinessComments
      )
  },

];
