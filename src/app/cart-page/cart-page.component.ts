import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../shared/models/product.model';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;
  currentLang: string = 'en';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Figyeljük a nyelv változását az URL-ben
    this.route.params.subscribe((params) => {
      this.currentLang = params['lang'] || 'en';
      this.translate.use(this.currentLang); // Nyelv beállítása
    });

    this.cart = this.shoppingCartService.getCart();
    this.calculateTotalPrice();
  }

  removeFromCart(productId: number): void {
    this.shoppingCartService.removeFromCart(productId);
    this.cart = this.shoppingCartService.getCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}