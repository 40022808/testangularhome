import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}
  addProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProducts(productId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  updateProduct(
    productId: number,
    productData: Partial<Product>
  ): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, productData);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
