import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
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

  constructor(private productService: ProductService) {}

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
      (response) => {
        console.log('Product added successfully:', response);
        this.successMessage = true;

        
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
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
