import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaSeleccionadaService } from '../categoria-seleccionada.service';
import { ProductosApiService } from '../productos-api.service';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categoria: any = '';
  catego: any = '';
  productos: any = '';
  productosCatego: any[] = [];
  prductosDestacados: any[] = [];
  carrito: any = '';

  constructor(private CarritoService: CarritoService, private router: Router, private ServicioCategoria: CategoriaSeleccionadaService, private ProductosApi: ProductosApiService) {
    this.ServicioCategoria.getCategoria().subscribe((respuesta) => {
      if (respuesta.cate) {
        this.catego = respuesta.cate;
        this.seleccinarProductos();
      } else {
        this.catego = localStorage.getItem('catego');
      }
    })
    this.CarritoService.getCarrito().subscribe((res) => {
      if (res) {
        this.carrito = res;
      }
    });
  }

  ngOnInit(): void {
    this.ProductosApi.getDatos().subscribe((res) => {
      this.productos = res;
    });
  }

  limpiarCuadro() {
    let div = document.querySelectorAll('.productosPrincipal');
    div[0].innerHTML = '';
  }

  seleccinarProductos() {
    this.limpiarCuadro();
    this.productosCatego = [];
    console.log('Cargando Productos');
    if (this.catego != undefined) {
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id == this.catego) {
          for (let x = 0; x < this.productos[i].productos.length; x++) {
            this.productosCatego.push(this.productos[i].productos[x]);
          }
          break;
        }
      }
    } else {
      this.router.navigate(['/inicio']);
    }
    console.log(this.productosCatego);
  }
  verProducto(idPro: any) {
    this.router.navigate(['/producto-ampliado'], { queryParams: { producto: idPro } });
  }
  addProducto(idProducto: any) {
    this.CarritoService.addProduct(idProducto);
  }


}
