import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowallComponent } from './pages/manageaccount/showall/showall.component';
import { AuthGuardService } from './auth/auth.guard.service';
import { AuthService } from './auth/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProductShowComponent } from './pages/product/product-show/product-show.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account/login', component: LoginComponent },
  {
    path: 'account/showall',
    component: ShowallComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'product',
    component: ProductShowComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
})
export class AppRoutingModule {}
