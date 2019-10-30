/* Framework specific */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* App specific */
import { AppComponent } from './app.component';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MiniSummaryComponent } from './shared/mini-summary/mini-summary.component';
import { FullSummaryComponent } from './shared/full-summary/full-summary.component';
import { AlertComponent } from './shared/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material Design Components */
import {MatCardModule} from '@angular/material/card';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CachingInterceptor } from './cache/caching-interceptor.service';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})

export class AppModule { }
