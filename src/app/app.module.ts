import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoadingComponent } from './loading/loading.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatHint } from '@angular/material/form-field';
import { ServiceComponent } from './service/service/service.component';
import { MatCardModule } from '@angular/material/card';
import { WebshopPageComponent } from './webshop-page/webshop-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ShoppingCartService } from './shopping-cart.service';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    LoadingComponent,
    DatepickerComponent,
    ServiceComponent,
    WebshopPageComponent,
    ProductPageComponent,
    CartPageComponent,
    MapComponent,
    DeliveryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatHint,
    MatCardModule,
    NgxMaterialTimepickerModule,
    GoogleMapsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    ShoppingCartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    this.loadGoogleMaps();
  }

  private loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdI4oqyU3e2sFX-JLOEI-s3h0G0tMfYN4`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}
