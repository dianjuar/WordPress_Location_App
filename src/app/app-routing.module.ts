import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { LocalizationComponent } from './localization/localization.component'

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'localization', component: LocalizationComponent },
  { path: '**',    redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
