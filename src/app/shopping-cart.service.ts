import { Injectable } from '@angular/core';
import { Product } from './shared/models/product.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private baseUrl = 'http://localhost:8000/'; // Backend alap URL
  private cart: { product: Product; quantity: number }[] = []; // Helyi kosár

  constructor(private http: HttpClient) {
    // Kosár betöltése a localStorage-ból
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  /**
   * Termék hozzáadása a kosárhoz a backend segítségével
   * @param productId A termék azonosítója
   * @param quantity A termék mennyisége
   */
  addCartItem(productId: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('userToken'); // Hitelesítési token
    const payload = {
      product_id: productId,
      quantity: quantity,
    };
    console.log('Sending cart data to backend:', payload); // Debugging
    return this.http.post(`${this.baseUrl}api/cart`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Kosár lekérése a backendről
   */
  getCartFromBackend(): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.get(`${this.baseUrl}api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Termék eltávolítása a kosárból a backend segítségével
   * @param productId A termék azonosítója
   */
  removeCartItem(productId: number): Observable<any> {
    const token = localStorage.getItem('userToken');
    console.log('Removing item with productId:', productId); // Debugging
    return this.http.delete(`${this.baseUrl}api/cartdelete/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Helyi kosár mentése a localStorage-ba
   */
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  /**
   * Helyi kosár törlése
   */
  clearCart(): void {
    this.cart = [];
    this.saveCart(); // Kosár törlése a localStorage-ból
  }

  /**
   * Helyi kosár lekérése
   */
  getCart(): Observable<{ product: Product; quantity: number }[]> {
    return of(this.cart); // Wrap the cart array in an Observable
  }

  /**
   * Termék hozzáadása a helyi kosárhoz
   * @param product A termék objektuma
   */
  addToLocalCart(product: Product): void {
    const existingItem = this.cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Ha már létezik, növeljük a mennyiséget
    } else {
      this.cart.push({ product, quantity: 1 }); // Új termék hozzáadása
    }
    this.saveCart(); // Kosár mentése
  }
  decreaseCartItem(productId: number): Observable<any> {
    const token = localStorage.getItem('userToken'); // Hitelesítési token
    return this.http.post(`${this.baseUrl}api/cart/decrease/${productId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}