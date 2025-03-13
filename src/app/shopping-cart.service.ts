import { Injectable } from '@angular/core';
import { Product } from './shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cart: Product[] = [];

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCart(): Product[] {
    return this.cart;
  }
}