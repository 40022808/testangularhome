import { Injectable } from '@angular/core';
import { Product } from './shared/models/product.model';
import { Cart } from './shared/models/Cart';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private apiUrl = 'http://localhost:3000/api/cart'; // API URL for user cart
  getUserCart(): Observable<any> {
    return this.http.get(this.apiUrl); // Auth token will be sent automatically if using an interceptor
  }
  private cart: { product: Product; quantity: number }[] = [];

  constructor(private http: HttpClient) {
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
    const existingItem = this.cart.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCart(); // Mentés a localStorage-ba
  }

  getCart(): Observable<{ product: Product; quantity: number }[]> {
    return of(this.cart); // Wrap the cart array in an Observable
  }

  removeFromCart(productId: number): void {
    const itemIndex = this.cart.findIndex(
      (item) => item.product.id === productId
    );
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
