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
  product: Product | undefined;
  itemAdded: boolean = false;
  errorMessage: string = '';
  quantity: number = 1;

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
        console.log('Product fetched:', this.product);
      },
      (error) => {
        console.error('Error fetching product:', error);
        this.errorMessage =
          'Failed to load product details. Please try again later.';
      }
    );
  }

  addToCart(productId: number, quantity: number): void {
    if (this.itemAdded) return;
    console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
    this.itemAdded = true;
    this.shoppingCartService.addCartItem(productId, quantity).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Product added to cart:', response.cartItem);
          setTimeout(() => {
            this.itemAdded = false;
          }, 3000);
        } else {
          console.error('Failed to add product to cart:', response.message);
          this.itemAdded = false;
        }
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
        this.itemAdded = false;
      }
    );
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack(): void {
    window.history.back();
  }
}
