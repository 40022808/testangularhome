import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { Observable, of } from 'rxjs'; // Ensure RxJS is imported
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProduct(productId: number): Observable<Product> {
    return of({ id: productId, name: 'Sample Product', price: 0 });
  }
  constructor() {}

  getProductById(id: number): Product {
    return this.getAll().find((product) => product.id == id)!;
  }

  getAll(): Product[] {
    return [
      {
        id: 1,
        name: 'Inebrya Color Perfect',
        price: 5390,
        imageURL: '../../assets/images/product1.jpg',
      },
      {
        id: 2,
        name: 'Inebrya Color Perfect',
        price: 3590,
        imageURL: '../../assets/images/product2.jpg',
      },
      {
        id: 3,
        name: 'Lisap Top Care Ultimate K',
        price: 6990,
        imageURL: '../../assets/images/product3.jpg',
      },
      {
        id: 4,
        name: 'Lisap Keraplant Nature',
        price: 5990,
        imageURL: '../../assets/images/product4.jpg',
      },
    ];
  }
}
