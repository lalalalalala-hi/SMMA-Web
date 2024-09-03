import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { DashboardComponent } from './components/statistics/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { RouteStatisticsComponent } from './components/statistics/route-statistics/route-statistics.component';
import { StorelistStatisticsComponent } from './components/statistics/store-detail-statistics/store-detail-statistics.component';
import { StoreStatisticsComponent } from './components/statistics/store-statistics/store-statistics.component';
import { AddStoreComponent } from './components/management/store/add-store/add-store.component';
import { EditStoreComponent } from './components/management/store/edit-store/edit-store.component';
import { ViewStoreComponent } from './components/management/store/view-store/view-store.component';
import { StoreListComponent } from './components/management/store/store-list/store-list.component';
import { AddEventComponent } from './components/management/event/add-event/add-event.component';
import { EventListComponent } from './components/management/event/event-list/event-list.component';
import { ViewEventComponent } from './components/management/event/view-event/view-event.component';
import { EditEventComponent } from './components/management/event/edit-event/edit-event.component';
import { AddPromoComponent } from './components/management/promotion/add-promo/add-promo.component';
import { EditPromoComponent } from './components/management/promotion/edit-promo/edit-promo.component';
import { ViewPromoComponent } from './components/management/promotion/view-promo/view-promo.component';
import { PromoListComponent } from './components/management/promotion/promo-list/promo-list.component';
import { WifiDataComponent } from './components/wifi/wifi-data/wifi-data.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UserStatisticsComponent,
    RouteStatisticsComponent,
    StoreStatisticsComponent,
    StorelistStatisticsComponent,
    AddStoreComponent,
    EditStoreComponent,
    StoreListComponent,
    ViewStoreComponent,
    AddEventComponent,
    EditEventComponent,
    EventListComponent,
    ViewEventComponent,
    AddPromoComponent,
    EditPromoComponent,
    ViewPromoComponent,
    PromoListComponent,
    WifiDataComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
