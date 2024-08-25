import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layouts/dashboardLayout/dashboardLayout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'todo',
        loadComponent: () =>
          import('./presentation/pages/todoPage/todoPage.component'),
      },
      {
        path: 'chat',
        loadComponent: () => import('./presentation/pages/chatPage/chatPage.component'),
      },
      {
        path: 'other',
        loadComponent: () => import('./presentation/pages/otherPage/otherPage.component'),
      },
      {
        path: '**',
        redirectTo: 'todo',
        pathMatch: 'full',
      },
    ],

  },
];
