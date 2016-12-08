import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent }   from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

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
  // {
  //   path: 'about',
  //   // component: HeroDetailComponent
  // },
  // {
  //   path: 'contact',
  //   // component: HeroesComponent
  // },
  // {
  //   path: 'event',
  //   // component: HeroesComponent
  // },
  // {
  //   path: 'forum',
  //   // component: HeroesComponent
  // },
  // {
  //   path: 'register',
  //   // component: HeroesComponent
  // },
  // {
  //   path: 'login',
  //   // component: HeroesComponent
  // },
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
