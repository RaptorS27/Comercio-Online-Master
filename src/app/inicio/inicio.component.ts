import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosApiService } from '../productos-api.service';
import { CategoriaSeleccionadaService } from '../categoria-seleccionada.service';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  categorias: any;
  carrito: any[] = [];
  mostrarCarro: boolean = false;
  prodCarro: any = [];
  precioTotal: any = 0;

  constructor(private CarritoService: CarritoService, private ServicioCategoria: CategoriaSeleccionadaService, private ProductosApi: ProductosApiService, private router: Router) {
    this.CarritoService.getCarrito().subscribe((res) => {
      if (res) {
        this.carrito = res;
      }
    });
  }

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos() {
    this.ProductosApi.getDatos().subscribe((res) => {
      this.categorias = res;
    });
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
