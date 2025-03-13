import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../shared/models/product';

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cart: Product[] = [];
  totalPrice: number = 0;
  product: any;
  // cartItems: CartItem[] = [];
  item: any;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cart = this.shoppingCartService.getCart();
    // this.cartItems = this.groupProducts(this.cart);
    this.calculateTotalPrice();
  }


  // groupProducts(cart: Product[]): CartItem[] {
  //   const groupedProducts: { [key: number]: CartItem } = {};

  //   cart.forEach(product => {
  //     if (groupedProducts[product.id]) {
  //       groupedProducts[product.id].quantity++;
  //     } else {
  //       groupedProducts[product.id] = { product, quantity: 1 };
  //     }
  //   });

  //   return Object.values(groupedProducts);
  // }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((sum, product) => sum + product.price, 0);
  }

}
