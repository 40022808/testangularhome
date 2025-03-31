import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../shared/models/product.model';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;
  currentLang: string = 'en';
  cartItems: any[] = [];
  userService: any;
products: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Figyeljük a nyelv változását az URL-ben
    this.route.params.subscribe((params) => {
      this.currentLang = params['lang'] || 'en';
      this.translate.use(this.currentLang); // Nyelv beállítása
      this.loadCart();
    });

    this.shoppingCartService.getCart().subscribe((data) => {
      this.cart = data;
    });
    this.calculateTotalPrice();
  }
  loadCart(): void {
    this.shoppingCartService.getCart().subscribe(
      (response: any) => {
        if (response.success) {
          this.cart = response.cartItems;
          this.calculateTotalPrice();
          console.log('Cart items loaded:', this.cart);
        } else {
          console.error('Failed to load cart items:', response.message);
        }
      },
      (error: any) => {
        console.error('Error loading cart items:', error);
      }
    );
  }
  addToCart(productId: number, quantity: number = 1): void {
    this.shoppingCartService.addCartItem(productId, quantity).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Item added to cart:', response.cartItem);
          this.loadCart(); // Frissítsük a kosár tartalmát
        } else {
          console.error('Failed to add item to cart:', response.message);
        }
      },
      (error: any) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
  
  
  loadCartItems(): void {
    this.userService.getCartItems().subscribe(
      (response: any) => {
        if (response.success) {
          this.cartItems = response.cartItems;
          console.log('Cart items loaded:', this.cartItems); // Debugging
        } else {
          console.error('Failed to load cart items:', response.message);
        }
      },
      (error: any) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  removeFromCart(productId: number): void {
    this.shoppingCartService.removeCartItem(productId).subscribe(
      (response: any) => {
        if (response.success) {
          this.cart = this.cart.filter(item => item.product.id !== productId);
          this.calculateTotalPrice();
          console.log('Item removed from cart:', productId);
        } else {
          console.error('Failed to remove item from cart:', response.message);
        }
      },
      (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
  
}
