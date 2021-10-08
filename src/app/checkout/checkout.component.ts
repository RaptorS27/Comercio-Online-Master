import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carroVacio = true;
  carrito: any[] = [];
  constructor(private CarritoService: CarritoService) {
  }

  ngOnInit(): void {
    this.CarritoService.getCarrito().subscribe((res) => {
      if (res) {
        this.carrito = res;
        this.carroVacio = false;
      }else{
        this.carroVacio = true;
      }
    });
    this.limpiarCuadro();
  }
  limpiarCuadro() {
    let div = document.querySelectorAll('.productosPrincipal');
    div[0].innerHTML = '';
  }

}
