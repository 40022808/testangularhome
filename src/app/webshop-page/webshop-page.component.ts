import { Component, importProvidersFrom } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webshop-page',
  templateUrl: './webshop-page.component.html',
  styleUrl: './webshop-page.component.css',
})
export class WebshopPageComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }

  addProduct() {
    this.router.navigate(['/:lang/add-product']);
  }
}
