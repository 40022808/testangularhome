import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service/service.component';


const routes: Routes = [
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/register', component: RegisterComponent },
  { path: ':lang/login', component: LoginComponent },
  { path: ':lang/user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/en/home', pathMatch: 'full' },
  { path: ':lang/service', component: ServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
