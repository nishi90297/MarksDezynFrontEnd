import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AddClientComponent } from '../../pages/add-client/add-client.component';
import { DesignQuotationComponent } from '../../pages/design-quotation/design-quotation.component';
import { RequirementFormComponent } from '../../pages/requirement-form/requirement-form.component';
import { UserComponent } from '../../pages/user/user.component';
import { AddClientBasicDetailsComponent } from '../../pages/add-client-basic-details/add-client-basic-details.component';
import { AddClientRequirementFormComponent } from '../../pages/add-client-requirement-form/add-client-requirement-form.component';
import { AddClientDesignQuotationComponent } from '../../pages/add-client-design-quotation/add-client-design-quotation.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard/addClient',           component: AddClientComponent },
    { path: 'dashboard/designQuotation',  component: DesignQuotationComponent },
    { path: 'dashboard/requirementForm',           component: AddClientRequirementFormComponent },
    { path: 'dashboard/user',           component: UserComponent },

    // { path: 'dashboard/addClientBasicDetails',           component: AddClientBasicDetailsComponent  },
    // { path: 'dashboard/addClientDesignQuotation',  component:  AddClientDesignQuotationComponent},
    // { path: 'dashboard/addClientRequirementForm',           component: AddClientRequirementFormComponent },

];
