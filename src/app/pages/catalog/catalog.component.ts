import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/products';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [AsyncPipe, RouterLink, LoaderComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  _productsService = inject(ProductsService);

  public products$!:Observable<[Product]> //verificar que en el servicio estoy declarando que la funcion retorna un Observable<[Product]>

  constructor () {
    this.products$ = this._productsService.getProducts()
  }

}
