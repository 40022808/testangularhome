import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cart: Product[] = [];
  groupedCart = [];
  totalPrice: number = 0;
  product: any;
  item: any;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cart = this.shoppingCartService.getCart();
    this.calculateTotalPrice();
  }

  removeFromCart(index: number): void {
    this.shoppingCartService.removeFromCart(index);
    this.cart = this.shoppingCartService.getCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }
}
