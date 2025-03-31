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
    this.shoppingCartService.addCartItem(productId, 1).subscribe(
      (response) => {
        console.log('Backend response:', response); // Debugging
        if (response.success) {
          this.itemAdded = true; // Sikeres hozzáadás
          console.log('Product added to cart:', response.cartItem);

          // Üzenet eltüntetése pár másodperc után
          setTimeout(() => {
            this.itemAdded = false;
          }, 3000);
        } else {
          console.error('Failed to add product to cart:', response.message);
          this.errorMessage = 'Failed to add product to cart. Please try again.';
        }
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        this.errorMessage = 'An error occurred while adding the product to the cart.';
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