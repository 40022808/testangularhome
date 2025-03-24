import { Injectable } from '@angular/core';
import { Product } from './shared/models/product.model';
import { Cart } from './shared/models/Cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cart: { product: Product; quantity: number }[] = [];

  constructor() {
    // Kosár betöltése a localStorage-ból
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private saveCart(): void {
    // Kosár mentése a localStorage-ba
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  

  addToCart(product: Product): void {
    const existingItem = this.cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCart(); // Mentés a localStorage-ba
  }
  
  getCart(): { product: Product; quantity: number }[] {
    return this.cart;
  }

  removeFromCart(productId: number): void {
    const itemIndex = this.cart.findIndex((item) => item.product.id === productId);
    if (itemIndex !== -1) {
      if (this.cart[itemIndex].quantity > 1) {
        this.cart[itemIndex].quantity--; // Csökkenti a darabszámot
      } else {
        this.cart.splice(itemIndex, 1); // Eltávolítja a terméket, ha a darabszám 0
      }
      this.saveCart(); // Frissíti a localStorage-t
    }
  }
  clearCart(): void {
    this.cart = [];
    this.saveCart(); // Kosár törlése a localStorage-ból
  }
}
