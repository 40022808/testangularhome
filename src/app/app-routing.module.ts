import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service/service.component';

import { WebshopPageComponent } from './webshop-page/webshop-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { PricesComponent } from './prices/prices.component';

const routes: Routes = [
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/register', component: RegisterComponent },
  { path: ':lang/login', component: LoginComponent },
  { path: ':lang/user', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: ':lang/service',
    component: ServiceComponent,
    canActivate: [AuthGuard],
  },
  { path: ':lang/delivery', component: DeliveryPageComponent },
  { path: 'delivery', component: DeliveryPageComponent },
  {
    path: ':lang/webshop',
    component: WebshopPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    component: ProductPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':lang/cart',
    component: CartPageComponent,
    canActivate: [AuthGuard],
  },
  { path: ':lang/Product-Management', component: AddProductComponent },
  { path: ':lang/prices', component: PricesComponent },
  { path: '', redirectTo: '/en/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
