import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosApiService } from '../productos-api.service';
import { CategoriaSeleccionadaService } from '../categoria-seleccionada.service';
import { CarritoService } from '../carrito.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categorias: any;
  carrito: any[] = [];
  mostrarCarro: boolean = false;
  prodCarro: any = [];
  precioTotal: any = 0;
  prodDestacados: any[] = [];
  mostrarMenu = true;

  constructor(private CarritoService: CarritoService, private ServicioCategoria: CategoriaSeleccionadaService, private ProductosApi: ProductosApiService, private router: Router) {
    this.getCarro();
  }

  ngOnInit(): void {
    this.ProductosApi.getDatos().subscribe((res) => {
      this.categorias = res;
    });
  }

  getCarro() {
    this.CarritoService.getCarrito().subscribe((res) => {
      console.log('Actualizando carrito');
      console.log(res);
      this.carrito = res;
    });
  }
  goCategoria(idCategoria: any) {
    console.log("Cambiando categoria" + idCategoria);
    this.ServicioCategoria.guardarCategoria(idCategoria);
    this.router.navigate(['/productos']);
    this.mostrarCarro = false;
  }

  goInicio() {
    this.router.navigate(['/inicio']);
  }

  verCarro() {
    this.CarritoService.getCarrito().subscribe((res) => {
      if (res) {
        this.carrito = res;
      }
    });
    this.productosCarro();
    this.mostrarCarro = !this.mostrarCarro;
  }

  productosCarro() {
    this.prodCarro = [];
    for (let i = 0; i < this.carrito.length; i++) {
      for (let x = 0; x < this.categorias.length; x++) {
        for (let a = 0; a < this.categorias[x].productos.length; a++) {
          if (this.carrito[i] == this.categorias[x].productos[a].id)
            this.prodCarro.push(this.categorias[x].productos[a]);
        }
      }
    }
    console.log(this.prodCarro);
    this.precioTotal = 0;
    for (let i = 0; i < this.prodCarro.length; i++) {
      this.precioTotal = this.precioTotal + parseInt(this.prodCarro[i].precio);
    }
  }

  setCarroVacio(){
    let carritoNew: any = [];
    this.CarritoService.setCarrito(carritoNew);
    this.carrito = [];
    this.mostrarCarro = false;
  }


}
