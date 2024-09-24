import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/user/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/user/user.component').then((m) => m.UserComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/user/pages/user-list/user-list.component').then(
            (m) => m.UserListComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './features/user/pages/user-details/user-details.component'
          ).then((m) => m.UserDetailsComponent),
        canActivate: [AuthGuard]
      },
    ],
  },
];
