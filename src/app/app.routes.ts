import { Routes } from '@angular/router'; 

export const routes: Routes = [
  {
    path: 'emails',
    loadComponent: () =>
      import('./email/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'send-email',
    loadComponent: () =>
      import('./email/pages/send-email-page/send-email-page.component').then(
        (m) => m.SendEmailPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'emails',
    pathMatch: 'full',
  },
];
