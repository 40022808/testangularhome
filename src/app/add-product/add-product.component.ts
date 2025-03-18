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

        // Reset the form
        this.product = {
          name: '',
          description: '',
          price: 0,
          imageURL: '',
        };
        this.selectedFile = null;

        // Hide the success message after 3 seconds
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
