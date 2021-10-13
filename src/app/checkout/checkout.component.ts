import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { ProductosApiService } from '../productos-api.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carroVacio = true;
  carrito: any[] = [];
  carroProds: any[] = [];
  productos: any;
  precioTotal: any = 0;

  constructor(private CarritoService: CarritoService, private ProductosApi: ProductosApiService) {
  }

  ngOnInit(): void {
    this.limpiarCuadro();
    this.carrito = this.CarritoService.getCarrito2();
    if (this.carrito.length != 0) {
      this.carroVacio = false;
    } else {
      this.carroVacio = true;
    }
    this.ProductosApi.getDatos().subscribe((res) => {
      this.productos = res;
      this.getProdsCarro();
    });

  }
  limpiarCuadro() {
    let div = document.querySelectorAll('.productosPrincipal');
    div[0].innerHTML = '';
  }


  getProdsCarro() {
    this.carrito.forEach((prod: any) => {
      this.productos.forEach((producto: any) => {
        for (let x = 0; x < producto.productos.length; x++) {
          if (producto.productos[x].id == prod) {
            this.carroProds.push(producto.productos[x]);
          }
        }
      })
    });
    console.log(this.carroProds);
    for (let i = 0; i < this.carroProds.length; i++) {
      this.precioTotal = this.precioTotal + parseInt(this.carroProds[i].precio);
    }
  }


}
