import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AddClientComponent } from '../../pages/add-client/add-client.component';
import { DesignQuotationComponent } from '../../pages/design-quotation/design-quotation.component';
import { UserComponent } from '../../pages/user/user.component';
import { AddClientRequirementFormComponent } from '../../pages/add-client-requirement-form/add-client-requirement-form.component';
import { AllClientsListComponent } from 'app/pages/all-clients-list/all-clients-list.component';
import { MeetingsComponent } from 'app/pages/meetings/meetings.component';
import {DesignerMeetingsComponent} from '../../pages/designer-meetings/designer-meetings.component';
import { DesignerClientMetComponent } from 'app/pages/designer-client-met/designer-client-met.component';
import { ProfileRequirementFormComponent } from 'app/pages/profile-requirement-form/profile-requirement-form.component';
import { ClientProfileComponent } from 'app/pages/client-profile/client-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard/allClientsList',      component: AllClientsListComponent },
    { path: 'dashboard/addClient',           component: AddClientComponent },
    { path: 'dashboard/meetings',           component: MeetingsComponent },
    { path: 'dashboard/designerMeetings',           component: DesignerMeetingsComponent },
    { path: 'dashboard/designerClientMet',           component: DesignerClientMetComponent },
    { path: 'dashboard/designQuotation',  component: DesignQuotationComponent },
    { path: 'dashboard/requirementForm',           component: AddClientRequirementFormComponent },
    { path: 'dashboard/user',           component: UserComponent },
    { path: 'dashboard/profile',           component: ClientProfileComponent },
    { path: 'dashboard/boq',           component: ProfileRequirementFormComponent },
    { path: 'dashboard/reqForm',           component: ProfileRequirementFormComponent },
];
