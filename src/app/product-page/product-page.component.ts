import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.product = productService.getProductById(params['id']);
    });
  }

  ngOnInit(): void {}
}
