import { Component, Input, inject } from '@angular/core';
import { CartProduct } from '../../../interfaces/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {

  _cartService = inject(CartService)

  //traigo la vairable product enviada por el padre
  @Input({required: true}) product!: CartProduct //el signo ! es para afirmar que siempre va a tener un valor y nunva va a ser nulo

  removeFromCart(id: string) {
    this._cartService.removeFromCart(id)       
  }

}
