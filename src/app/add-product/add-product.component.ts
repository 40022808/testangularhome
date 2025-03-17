import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Product = { name: '', price: 0, imageURL: '' };

  constructor(private productService: ProductService) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe((response) => {
      console.log('Product added:', response);
    });
  }
}
