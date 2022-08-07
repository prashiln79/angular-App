import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SocketIoModule} from 'ngx-socket-io';
import {ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '@app/env';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { CanActivateApp } from './auth/route-guard.CanActivate';
import { TokenInterceptorService } from './auth/token.interceptor';
import {MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, MatTooltipModule} from "@angular/material/tooltip";
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';



let gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.client_id,
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.metadata.readonly"
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ChartsModule,
    MatToolbarModule,
    MatDividerModule,
    MatChipsModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    BrowserAnimationsModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  providers: [
    CanActivateApp,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true
    },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    {provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
