import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AddClientComponent } from '../../pages/add-client/add-client.component';
import { DesignQuotationComponent } from '../../pages/design-quotation/design-quotation.component';
import { UserComponent } from '../../pages/user/user.component';
import { AddClientRequirementFormComponent } from '../../pages/add-client-requirement-form/add-client-requirement-form.component';
import { MeetingsComponent } from 'app/pages/meetings/meetings.component';
import {DesignerMeetingsComponent} from '../../pages/designer-meetings/designer-meetings.component';
import { DesignerClientMetComponent } from 'app/pages/designer-client-met/designer-client-met.component';
import { ProfileRequirementFormComponent } from 'app/pages/profile-requirement-form/profile-requirement-form.component';
import { ClientProfileComponent } from 'app/pages/client-profile/client-profile.component';
import { AdminDashboardComponent } from 'app/pages/admin-dashboard/admin-dashboard.component';
import { PresalesComponent } from 'app/pages/presales/presales.component';
import { AllClientsComponent } from 'app/pages/all-clients/all-clients.component';
import {OnBoardClientsComponent} from '../../src/app/pages/on-board-clients/on-board-clients.component';

export const AdminLayoutRoutes: Routes = [

    // common - all
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard/presales',      component: PresalesComponent },
    { path: 'dashboard/allClients',      component: AllClientsComponent },
    { path: 'dashboard/addClient', component: AddClientComponent},
    { path: 'dashboard/onBoard', component: OnBoardClientsComponent},
    // PreSales & Designer common
    { path: 'dashboard/meetings',           component: MeetingsComponent },

    // PRESALES

    // Designer
    { path: 'dashboard/designerClientMet',           component: DesignerClientMetComponent },
    { path: 'dashboard/profile',           component: ClientProfileComponent },
    { path: 'dashboard/designQuotation',  component: DesignQuotationComponent },
    { path: 'dashboard/reqForm',           component: ProfileRequirementFormComponent },

    // Team Leader

    // Manager

];
