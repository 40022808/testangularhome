import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-webshop-page',
  templateUrl: './webshop-page.component.html',
  styleUrls: ['./webshop-page.component.css'],
})
export class WebshopPageComponent implements OnInit {
  userRole: string | null = null;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUserRole();
  }

  loadUserRole(): void {
    this.userService.getUserRole().subscribe(
      (role: string) => {
        this.userRole = role;
        console.log('User role:', this.userRole); // Debugging statement
      },
      (error) => {
        console.error('Error fetching user role:', error); // Debugging statement
      }
    );
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
}
