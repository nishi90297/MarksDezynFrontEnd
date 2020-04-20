import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { AddClientComponent } from '../../pages/add-client/add-client.component';
import { DesignQuotationComponent } from '../../pages/design-quotation/design-quotation.component';
// import { RequirementFormComponent } from '../../pages/requirement-form/requirement-form.component';
import { UserComponent }            from '../../pages/user/user.component';

import { AddClientBasicDetailsComponent } from '../../pages/add-client-basic-details/add-client-basic-details.component';
import { AddClientRequirementFormComponent } from '../../pages/add-client-requirement-form/add-client-requirement-form.component';
import { AddClientDesignQuotationComponent } from '../../pages/add-client-design-quotation/add-client-design-quotation.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RequirementFormConfirmationDialogBoxComponent} from '../../pages/requirement-form-confirmation-dialog-box/requirement-form-confirmation-dialog-box.component';
import {RequirementFormConfirmationDialogBoxService} from '../../Services/requirement-form-confirmation-dialog-box.service';
import { AllClientsListComponent } from 'app/pages/all-clients-list/all-clients-list.component';
import { MeetingsComponent } from 'app/pages/meetings/meetings.component';
import {DesignerMeetingsComponent} from '../../pages/designer-meetings/designer-meetings.component';
import { DesignerClientMetComponent } from 'app/pages/designer-client-met/designer-client-met.component';
import { ClientProfileComponent } from 'app/pages/client-profile/client-profile.component';
import { ProfileRequirementFormComponent } from 'app/pages/profile-requirement-form/profile-requirement-form.component';
import { AdminDashboardComponent } from 'app/pages/admin-dashboard/admin-dashboard.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    TableModule,
    AccordionModule,
    DropdownModule
  ],
  declarations: [
    DashboardComponent,
    AddClientComponent,
    DesignQuotationComponent,
    // RequirementFormComponent,
    UserComponent,

    AddClientBasicDetailsComponent,
    AddClientRequirementFormComponent,
    AddClientDesignQuotationComponent,
    AllClientsListComponent,
    MeetingsComponent,
    DesignerMeetingsComponent,
    DesignerClientMetComponent,
    ClientProfileComponent,
    ProfileRequirementFormComponent,

    AdminDashboardComponent
  ],

  // providers: [ RequirementFormConfirmationDialogBoxService ],
  // entryComponents: [ RequirementFormConfirmationDialogBoxComponent ],
})

export class AdminLayoutModule {}

