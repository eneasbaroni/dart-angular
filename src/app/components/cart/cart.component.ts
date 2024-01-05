import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CartProductComponent } from '../cart-product/cart-product.component';
import {NgClass} from '@angular/common'; //para poder usar la directiva ngClass (classes condicionales)

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartProductComponent, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  _cartService = inject(CartService)
  cart$ = this._cartService.cart$
  totalPrice$ = this._cartService.totalPrice$
  hidden = true

  @Output() closeCartEvent = new EventEmitter();

  closeCart() {  
    this.hidden = true
    setTimeout(() => {      
      this.closeCartEvent.emit(); //emite el evento para que lo escuche el padre         
    }, 500);      
  }

  ngOnInit() {         
    setTimeout(() => {      
      this.hidden = false          
    }, 100);
  } 

}
