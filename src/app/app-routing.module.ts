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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
