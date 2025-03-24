import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
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