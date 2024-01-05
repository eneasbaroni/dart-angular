import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CounterComponent } from '../../components/counter/counter.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CounterComponent, LoaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  _router = inject (ActivatedRoute) //para pobtener los params
  _productsService = inject(ProductsService);

  public product$!:Observable<Product> //verificar que en el servicio estoy declarando que la funcion retorna un Observable<Product>

  constructor () {
    this.product$ = this._productsService.getProduct(this._router.snapshot.params['id']);
  }

}
