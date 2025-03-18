import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  itemAdded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
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

  addtoCart(): void {
    this.itemAdded = true;

    setTimeout(() => {
      this.itemAdded = false;
    }, 3000);
  }

  goBack(): void {
    window.history.back();
  }
}
