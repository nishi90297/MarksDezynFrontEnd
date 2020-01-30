import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AddClientComponent } from '../../pages/add-client/add-client.component';
import { DesignQuotationComponent } from '../../pages/design-quotation/design-quotation.component';
import { RequirementFormComponent } from '../../pages/requirement-form/requirement-form.component';
import { UserComponent } from '../../pages/user/user.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard/addClient',           component: AddClientComponent },
    { path: 'dashboard/designQuotation',  component: DesignQuotationComponent },
    { path: 'dashboard/requirementForm',           component: RequirementFormComponent },
    { path: 'dashboard/user',           component: UserComponent },
];
