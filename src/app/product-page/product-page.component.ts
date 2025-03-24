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
  
 
// Removed duplicate addToCart method
  product: Product|undefined;
  itemAdded:boolean= false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(
      (product: Product) => {
        this.product = product;
        console.log('Product fetched:', this.product); // Debugging statement
      },
      (error) => {
        console.error('Error fetching product:', error); // Debugging statement
      }
    );
  }

  addToCart(): void {
    if (this.product) {
      this.shoppingCartService.addToCart(this.product); // Termék hozzáadása a kosárhoz
      this.itemAdded = true;
  
      // Üzenet eltüntetése pár másodperc után
      setTimeout(() => {
        this.itemAdded = false;
      }, 3000);
  
      console.log('Product added to cart:', this.product); // Debugging
    }
  }

  goBack(): void {
    window.history.back();
  }
}
