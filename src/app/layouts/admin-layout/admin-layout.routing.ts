import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    {
        path:'',
        redirectTo:'addlient'
    },
    { path: 'addClient',      component: DashboardComponent },
    { path: 'icons',           component: IconsComponent },
    { path: 'Leads Open',          component: TableComponent },
    { path: 'Client Met',          component: IconsComponent },
    { path: 'Onboard Client',  component: NotificationsComponent },
];
