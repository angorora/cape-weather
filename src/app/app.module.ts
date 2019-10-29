/* Framework specific */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* App specific */
import { AppComponent } from './app.component';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MiniSummaryComponent } from './shared/mini-summary/mini-summary.component';
import { FullSummaryComponent } from './shared/full-summary/full-summary.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MiniSummaryComponent,
    FullSummaryComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
