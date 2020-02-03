import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { from } from 'rxjs';
import { RegisterComponent } from './Auth/register/register.component';
export const AppRoutes: Routes = [

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path:'login',
        pathMatch: 'full',
        component: LoginComponent
      },
      {
        path:'logout',
        pathMatch: 'full',
        component: LoginComponent
      },
      {
        path:'register',
        pathMatch: 'full',
        component: RegisterComponent
      },
      {
        path:'dashboard',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
          path: '',
          component: AdminLayoutComponent,
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
