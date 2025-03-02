import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { ServiceComponent } from './service/service/service.component';

=======
import { WebshopPageComponent } from './webshop-page/webshop-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
>>>>>>> 033531b (Webshop)

const routes: Routes = [
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/register', component: RegisterComponent },
  { path: ':lang/login', component: LoginComponent },
  { path: ':lang/user', component: UserComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: '', redirectTo: '/en/home', pathMatch: 'full' },
  { path: ':lang/service', component: ServiceComponent },
=======
  { path: ':lang/webshop', component: WebshopPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'lang/cart', component: CartPageComponent },
  { path: '', redirectTo: '/en/home', pathMatch: 'full' },
>>>>>>> 033531b (Webshop)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
<<<<<<< HEAD
  exports: [RouterModule]
})
export class AppRoutingModule { }
=======
  exports: [RouterModule],
})
export class AppRoutingModule {}
>>>>>>> 033531b (Webshop)
