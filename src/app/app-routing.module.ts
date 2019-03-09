import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MonsterDetailComponent } from './pages/monster-detail/monster-detail.component';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'monster/:id', component: MonsterDetailComponent },
  { path: 'monsters', component: MonsterListComponent },

  // TODO: add page not found component.
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
