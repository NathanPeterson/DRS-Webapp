import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent }   from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MyEventPageComponent } from './my-event-page/my-event-page.component';
import { ProposalAppComponent} from './proposal-app/proposal-app.component';
import { ReviewAppComponent} from './review-app/review-app.component';

import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminOverviewComponent } from './admin-portal/overview/overview.component';
import { AdminReviewerAppsComponent } from './admin-portal/reviewer-apps/reviewer-apps.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  // {
  //   path: 'contact',
  //   // component: HeroesComponent
  // },
  {
    path: 'event',
    component: MyEventPageComponent
  },
  // {
  //   path: 'forum',
  //   // component: HeroesComponent
  // },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'proposal-app',
    component: ProposalAppComponent
  },
  {
    path: 'review-app',
    component: ReviewAppComponent
  },
  {
    path: 'admin-portal',
    component: AdminPortalComponent,
    children:[
      {
        path: 'admin-overview',
        component: AdminOverviewComponent
      },
      {
        path: 'reviewer-apps',
        component: AdminReviewerAppsComponent
      }
    ]
  },
  // {
  //   path: 'contact',
  //   // component: HeroesComponent
  // }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
