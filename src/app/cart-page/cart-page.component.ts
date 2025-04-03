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
      this.loadCart(); // Kosár betöltése a backendből
    });
  }

  loadCart(): void {
    this.shoppingCartService.getCartFromBackend().subscribe(
      (response: any) => {
        if (response.success) {
          this.cart = response.cartItems; // A backendből kapott kosár adatok
          this.calculateTotalPrice(); // Teljes ár újraszámítása
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

  addToCart(productId: number, quantity: number): void {
    this.shoppingCartService.addCartItem(productId, quantity).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Item added to cart:', response.cartItem);
          this.loadCart(); // Frissítsük a kosár tartalmát a backendből
        } else {
          console.error('Failed to add item to cart:', response.message);
        }
      },
      (error: any) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  removeFromCart(productId: number): void {
    this.shoppingCartService.removeCartItem(productId).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Item removed from cart:', productId);
          this.loadCart(); // Frissítsük a kosár tartalmát a backendből
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
  decreaseFromCart(productId: number): void {
    this.shoppingCartService.decreaseCartItem(productId).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Item quantity decreased:', productId);
          this.loadCart(); // Frissítsük a kosár tartalmát a backendből
        } else {
          console.error('Failed to decrease item quantity:', response.message);
        }
      },
      (error: any) => {
        console.error('Error decreasing item quantity:', error);
      }
    );
  }
}