import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { SettingsComponent } from './settings/settings.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';


const routes: Routes =[
  {path: '', redirectTo: '/aboutus', pathMatch: 'full'},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'admin', component: AdmintabComponent},
  {path: '**', redirectTo: '/aboutus', pathMatch: 'full'}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
