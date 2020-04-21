import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RequirementFormComponent } from './pages/requirement-form/requirement-form.component';
export const AppRoutes: Routes = [

      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
      },
      {
        path: 'requirementForm',
        pathMatch: 'full',
        component: RequirementFormComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
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
        path: '**',
        redirectTo: ''
      }

];
