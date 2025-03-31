import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';
import { UserService } from '../user.service';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { MatDialog } from '@angular/material/dialog'; // Ensure MatDialog is imported

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
    private userService: UserService,
    private dialog: MatDialog // Inject MatDialog
  ) {}

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

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          console.log('Product deleted successfully');
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  editProduct(productId: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      height: 'auto',
      data: { ...product }, // Pass the product data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated product data:', result); // Debugging: Log the updated data
        this.productService.updateProduct(productId, result).subscribe(
          (updatedProduct) => {
            console.log('Product updated successfully:', updatedProduct); // Debugging: Log the response
            // Update the product in the local list
            const index = this.products.findIndex((p) => p.id === productId);
            if (index !== -1) {
              this.products[index] = { ...this.products[index], ...result }; // Update the local product
            }
          },
          (error) => {
            console.error('Error updating product:', error); // Debugging: Log any errors
          }
        );
      }
    });
  }
}
