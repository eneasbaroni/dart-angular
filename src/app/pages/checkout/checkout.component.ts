import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CartService } from '../../services/cart.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {NgClass} from '@angular/common'; //para poder usar la directiva ngClass (classes condicionales)
import { HttpClient } from '@angular/common/http';
import {DOCUMENT} from '@angular/common'; //para poder acceder al DOM e insertar el script de Mercado Pago

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [LoaderComponent, ReactiveFormsModule, NgClass],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  loading = false;
  mercadoPagoOpen = false;
  orderId: string | undefined;

  _document = inject(DOCUMENT);

  _cartService = inject(CartService)
  cart$ = this._cartService.cart$

  _http = inject(HttpClient);

  handleSubmit() {  
    
    this.loading = true;
    
    if (this.cart$().length === 0) {
      alert('No hay productos en el carrito');
      this.loading = false;
      return
    }
    
    try {      
      
      const payer = this.checkoutForm.value;
      const products = this.cart$().map(product => {
        return {
          id: product._id,
          title: product.name,
          description: product.name, //uso name ya que no puedo superar los 200 caracteres
          unit_price: product.price,
          currency_id: 'ARS',        
          quantity: product.quantity
        }
      });
  
      //hacer peticion post a https://dart-server-hd0v.onrender.com/checkout, luego capturar la respuesta y guardarla en la variable orderId      
      this.mercadoPagoOpen = true;
      this._http.post('https://dart-server-hd0v.onrender.com/checkout', {payer, products}).subscribe((response: any) => {
        console.log("🚀 ~ file: checkout.component.ts:47 ~ CheckoutComponent ~ this._http.post ~ response:", response)      
        this.orderId = response;
        
        //crear un script para renderizar el boton de Mercado Pago
        const script = this._document.createElement('script');
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
        script.dataset['preferenceId'] = this.orderId;
        script.dataset['buttonLabel'] = 'PAGAR';
        
        const mercadopagoBtn = document.getElementById('mercadopago')
        if (!mercadopagoBtn) return
        mercadopagoBtn.innerHTML = ''
        mercadopagoBtn.appendChild(script)  
        
        //limpiar el carrito
        this._cartService.clearCart()
        
        //limpiar formulario
        this.loading = false;
        this.checkoutForm.reset()
  
      });
    } catch (error) {
      console.log(error)
      alert('Error al procesar el pedido');
      this.loading = false
    }
    
  
  }

  checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    identification: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
  })

  closeMercadoPago() {
    this.mercadoPagoOpen = false
  }


}
