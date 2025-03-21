import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';


@Component({
  selector: 'app-webshop-page',
  templateUrl: './webshop-page.component.html',
  styleUrls: ['./webshop-page.component.css'],
})
export class WebshopPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(1).subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log('Products loaded:', this.products); // Debugging statement
      },
      (error) => {
        console.error('Error loading products:', error); // Debugging statement
      }
    );
  }
  addProduct(): void {
    const currentLang = 'en'; // Replace this with logic to get the current language dynamically
    this.router.navigate([`/${currentLang}/add-product`]);
  }
}
