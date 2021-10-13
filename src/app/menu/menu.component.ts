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
    console.log('Ruta ACtual: ' + this.router.url);
    if (this.router.url == '/') {
      this.mostrarMenu = false;
    } else {
      this.mostrarMenu = true;
    }
    this.ProductosApi.getDatos().subscribe((res) => {
      this.categorias = res;
      this.getDestacados();
    });
  }

  getCarro() {
    this.CarritoService.getCarrito().subscribe((res) => {
      console.log('Actualizando carrito');
      console.log(res);
      this.carrito = res;
    });
  }
  getDestacados() {
    if (this.prodDestacados.length == 0) {
      this.categorias.forEach((producto: any) => {
        for (let x = 0; x < producto.productos.length; x++) {
          if (producto.productos[x].destacado) {
            this.prodDestacados.push(producto.productos[x]);
          }
        }
      });
    }
  }
  goCategoria(idCategoria: any) {
    console.log("Cambiando categoria" + idCategoria);
    this.ServicioCategoria.guardarCategoria(idCategoria);
    this.router.navigate(['productos']);
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


}
