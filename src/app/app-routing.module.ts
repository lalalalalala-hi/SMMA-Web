import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { StoreManagementComponent } from './components/store-management/store-management.component';
import { PromotionManagementComponent } from './components/promotion-management/promotion-management.component';
import { EventManagementComponent } from './components/event-management/event-management.component';

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
    path: 'store-management',
    component: StoreManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'promotion-management',
    component: PromotionManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'event-management',
    component: EventManagementComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
