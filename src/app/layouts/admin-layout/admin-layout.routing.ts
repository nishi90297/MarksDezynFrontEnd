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
import { AdminDashboardComponent } from 'app/pages/admin-dashboard/admin-dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },

    //PRESALES
    { path: 'dashboard/meetings',           component: MeetingsComponent },
    
    //Designer
    { path: 'dashboard/designerMeetings',           component: DesignerMeetingsComponent },
    { path: 'dashboard/designerClientMet',           component: DesignerClientMetComponent },
    
    //Team Leader
    
    //Manager
];
