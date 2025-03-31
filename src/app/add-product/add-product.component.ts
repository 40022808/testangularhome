import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {

  addproducForm: boolean = false;

  userRole: string | null = null;
  products: Product[] = [];

  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageURL: '',
    quantity: undefined,
    product: undefined
  };
  selectedFile: File | null = null;
  successMessage: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog // Inject MatDialog
  ) {}


  ngOnInit(): void {
    this.loadProducts();
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description || '');
    formData.append('price', this.product.price.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData).subscribe(
      (response: any) => {
        console.log('Product added successfully:', response);
        this.successMessage = true;
        this.addproducForm = false;
        this.loadProducts();
        
        this.product = {
          name: '',
          description: '',
          price: 0,
          imageURL: '',
          quantity: 0, 
          product: '', 
        };
        this.selectedFile = null;

        
        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      },
      (error: any) => {
        console.error('Error adding product:', error);
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



    openProductDialog(product: Product): void {
      const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
        width: '90vw',
        height: '80vh',
        data: { product } // 将商品数据传递到对话框
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result?.updatedProduct) {
          // 处理商品更新
          this.loadProducts(); // 重新加载商品数据
        }
        if (result?.deletedProduct) {
          // 处理商品删除
          this.loadProducts(); // 重新加载商品数据
        }
      });
    }






}
