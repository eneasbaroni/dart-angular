import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../interfaces/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  //traigo la vairable product enviada por el padre
  @Input({required: true}) product!: Product //el signo ! es para afirmar que siempre va a tener un valor y nunva va a ser nulo

  counter: number = 1;
  _cartService = inject(CartService)
  cart$ = this._cartService.cart$

  addToCounter () {
    this.counter += 1
  }

  subtractFromCounter () {
    if (this.counter > 0) {
      this.counter -= 1
    } else {
      this.counter = 0
    }
  }

  addProduct() {
    //console.log(this.product);  //el padre está pasando la variable product y la capturamos por medio del @Input 
      const quantity = this.counter
      this._cartService.addToCart({ ...this.product, quantity })
      this.counter = 1
      console.log(this.cart$());
    
  }

}
