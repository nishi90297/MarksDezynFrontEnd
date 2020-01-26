import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard/user',           component: UserComponent },
    { path: 'dashboard/table',          component: TableComponent },
    { path: 'dashboard/icons',          component: IconsComponent },
    { path: 'dashboard/notifications',  component: NotificationsComponent },
];
