import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  _http = inject(HttpClient);
  baseURL = 'https://dart-server-hd0v.onrender.com/ceramics';

  getProducts(): Observable<[Product]> {
    return this._http.get<[Product]>(this.baseURL);
  }

  getProduct(id: string){
    return this._http.get<Product>(this.baseURL + '/' + id);
  }

  constructor() { }
}
