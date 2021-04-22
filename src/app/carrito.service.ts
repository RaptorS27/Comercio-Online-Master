import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private subject = new Subject<any>();
  private carrito$ = new Subject<string[]>();
  carrito: any[] = [];
  constructor() { };


  addProduct(idProducto: string) {
    this.carrito.push(idProducto);
    this.carrito$.next(this.carrito);
  }
  
  getCarrito(): Observable<any> {
      return this.carrito$.asObservable();
    }
}
