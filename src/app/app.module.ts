import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from './Services/login-service.service';
import { RegisterComponent } from './Auth/register/register.component';
import { LogoutComponent } from './Auth/logout/logout.component';
import { RequirementFormComponent } from './pages/requirement-form/requirement-form.component';
import { RequirementFormServiceService } from './Services/requirement-form-service.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RequirementFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginServiceService, CookieService, RequirementFormServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
