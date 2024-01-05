import { Injectable, computed, signal } from '@angular/core';
import { CartProduct } from '../../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  #cart = signal<CartProduct[]>([]);
  cart$ = computed(() => this.#cart());

  totalPrice$ = computed(() => {
    return this.#cart().reduce((total, product) => total + product.price * product.quantity, 0);
  })

  addToCart(product: CartProduct) {
    //verificar si existe el producto mediante el _id
    const existingProduct = this.#cart().find(p => p._id === product._id);
    if (existingProduct) {
      this.#cart.update(products => products.map(p => p._id === existingProduct._id ? { ...p, quantity: p.quantity += product.quantity } : p));  
      //guardar cart en el local storage
      localStorage.setItem('cart', JSON.stringify(this.#cart()));
      alert('Producto agregado al carrito');
    } else {
      this.#cart.update(p => [...p, product]);
      localStorage.setItem('cart', JSON.stringify(this.#cart()));
      alert('Producto agregado al carrito');
    }
  }

  removeFromCart(id: string) {
    this.#cart.update(p => p.filter(product => product._id !== id));
    localStorage.setItem('cart', JSON.stringify(this.#cart()));
    alert('Producto eliminado del carrito');
  }

  clearCart() {
    this.#cart.set([]);
    localStorage.setItem('cart', JSON.stringify(this.#cart()));
  }

  constructor() { 
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.#cart.set(JSON.parse(cart));
    }
  } 

}
