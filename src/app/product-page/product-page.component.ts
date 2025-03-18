import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  itemAdded = false;

  ngOnInit(): void {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  addtoCart(): void {
    this.shoppingCartService.addToCart(this.product);
    this.itemAdded = true;

    setTimeout(() => {
      this.itemAdded = false;
    }, 1000);
  }

  goBack(): void {
    window.history.back();
  }
}
