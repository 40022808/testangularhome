import { Component, importProvidersFrom } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-webshop-page',
  templateUrl: './webshop-page.component.html',
  styleUrl: './webshop-page.component.css',
})
export class WebshopPageComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }
}
