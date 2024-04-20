import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/statistics/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { RouteStatisticsComponent } from './components/statistics/route-statistics/route-statistics.component';
import { StorelistStatisticsComponent } from './components/statistics/storelist-statistics/storelist-statistics.component';
import { StoreStatisticsComponent } from './components/statistics/store-statistics/store-statistics.component';
import { StoreListComponent } from './components/management/store/store-list/store-list.component';
import { AddStoreComponent } from './components/management/store/add-store/add-store.component';
import { EditStoreComponent } from './components/management/store/edit-store/edit-store.component';
import { ViewStoreComponent } from './components/management/store/view-store/view-store.component';
import { AddEventComponent } from './components/management/event/add-event/add-event.component';
import { EditEventComponent } from './components/management/event/edit-event/edit-event.component';
import { EventListComponent } from './components/management/event/event-list/event-list.component';
import { ViewEventComponent } from './components/management/event/view-event/view-event.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-statistics',
    component: UserStatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'route-statistics',
    component: RouteStatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'store-statistics',
    component: StoreStatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'storelist-statistics',
    component: StorelistStatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-store',
    component: AddStoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-store',
    component: EditStoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'store-list',
    component: StoreListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-store',
    component: ViewStoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-event',
    component: EditEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event-list',
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-event',
    component: ViewEventComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
