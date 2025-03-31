import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product: Product | undefined; // A termék adatai
  itemAdded: boolean = false; // Jelzi, hogy a termék sikeresen hozzá lett adva a kosárhoz
  errorMessage: string = ''; // Hibák megjelenítésére

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // Termék ID lekérése az URL-ből
    const productId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.fetchProduct(productId);
  }

  /**
   * Termékadatok betöltése a backendről
   * @param productId A termék azonosítója
   */
  fetchProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe(
      (product: Product) => {
        this.product = product;
        console.log('Product fetched:', this.product); // Debugging
      },
      (error) => {
        console.error('Error fetching product:', error); // Debugging
        this.errorMessage = 'Failed to load product details. Please try again later.';
      }
    );
  }

  /**
   * Termék hozzáadása a kosárhoz
   * @param productId A termék azonosítója
   */
  addToCart(productId: number): void {
    if (this.itemAdded) return; // Megakadályozzuk a dupla kattintást
  
    this.itemAdded = true; // Gomb letiltása
    this.shoppingCartService.addCartItem(productId, 1).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Product added to cart:', response.cartItem);
          setTimeout(() => {
            this.itemAdded = false; // Gomb újra engedélyezése
          }, 3000);
        } else {
          console.error('Failed to add product to cart:', response.message);
          this.itemAdded = false; // Gomb újra engedélyezése
        }
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
        this.itemAdded = false; // Gomb újra engedélyezése
      }
    );
  }

  /**
   * Visszalépés az előző oldalra
   */
  goBack(): void {
    window.history.back();
  }
}