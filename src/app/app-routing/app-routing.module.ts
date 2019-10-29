import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '../core/landing-page/landing-page.component';
const appRoutes: Routes = [
 {path:'', component: LandingPageComponent}
];
@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
