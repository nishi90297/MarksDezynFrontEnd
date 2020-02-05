import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {LogoutComponent} from './Auth/logout/logout.component';

import { from } from 'rxjs';
import { RegisterComponent } from './Auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
export const AppRoutes: Routes = [

      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
      },
      // {
      //   path: 'logout',
      //   pathMatch: 'full',
      //   component: LogoutComponent
      // },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      
      // {
      //   path: 'register',
      //   pathMatch: 'full',
      //   component: RegisterComponent
      // },
      // {
      //   path: 'dashboard',
      //   pathMatch: 'full',
      //   redirectTo: 'dashboard',
      // },
      {
          path: '',
          component: AdminLayoutComponent,
          canActivate: [AuthGuard],
          children: [
              {
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        },
        {
          path: '**',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
      },
      {
        path:'**',
        redirectTo:''
      }
      // {
      //   path: 'dashboard',
      //   component: AdminLayoutComponent,
      //   children: [
      //       {
      //     path: '**',
      //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      // }
      // ]
    // }

  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // }, {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  // }]},
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
]
