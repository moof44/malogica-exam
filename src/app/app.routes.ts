import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => import('./features/user/user.component').then(m => m.UserComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/pages/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/pages/user-details/user-details.component').then(m => m.UserDetailsComponent)
      }
    ]
  }
];
