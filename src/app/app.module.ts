import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderParallaxComponent } from './header-parallax/header-parallax.component';

import {AngularFireModule} from 'angularfire2';
import { AuthProviders, AuthMethods } from 'angularfire2';

import { firebaseConfig } from './../environments/firebase.config';

import { ng2Parallax  } from '../../node_modules/ang2-parallax/ng2parallax';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule }     from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

import { InstitutionService } from './services/institution.service'
import { StatesService } from './services/states.service'
import { ProposalDomainService } from './services/proposal-domain.service'
import { TotalProposalsService } from './services/total-proposals.service'

import { CarouselModule} from 'ng2-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { MyEventPageComponent } from './my-event-page/my-event-page.component';
import { ReviewAppComponent } from './review-app/review-app.component';
import { ProposalAppComponent } from './proposal-app/proposal-app.component';

import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { UploadFilesService } from './services/upload-files.service';

import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminOverviewComponent } from './admin-portal/overview/overview.component';
import { AdminReviewerAppsComponent } from './admin-portal/reviewer-apps/reviewer-apps.component';
import { ApplicationComponent } from './admin-portal/reviewer-apps/application.component';

import { ReviewerPortalComponent } from './reviewer-portal/reviewer-portal.component';
import { ProposalPendingComponent } from './reviewer-portal/proposal-pending/proposal-pending.component';
import { ProposalApprovedComponent } from './reviewer-portal/proposal-approved/proposal-approved.component';
import { ProposalRejectedComponent } from './reviewer-portal/proposal-rejected/proposal-rejected.component';
import { ReviewProposalObjectComponent } from './reviewer-portal/review-proposal-object/review-proposal-object.component';

import { ProfileComponent } from './profile/profile.component';

const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderParallaxComponent,
    ng2Parallax,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    AboutComponent,
    LoginComponent,
    MyEventPageComponent,
    ReviewAppComponent,
    ProposalAppComponent,
    NgDropFilesDirective,
    AdminPortalComponent,
    AdminOverviewComponent,
    AdminReviewerAppsComponent,
    ApplicationComponent,
    ReviewerPortalComponent,
    ProposalPendingComponent,
    ReviewProposalObjectComponent,
    ProposalApprovedComponent,
    ProposalRejectedComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [
    InstitutionService,
    StatesService,
    ProposalDomainService,
    UploadFilesService,
    TotalProposalsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
