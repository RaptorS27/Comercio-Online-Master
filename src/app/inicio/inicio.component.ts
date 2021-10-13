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
  prodDestacados: any[] = [];

  constructor(private CarritoService: CarritoService,private ProductosApi: ProductosApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.ProductosApi.getDatos().subscribe((res) => {
      this.categorias = res;
      this.getDestacados();
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

  verProducto(idPro: any) {
    console.log(idPro);
    this.router.navigate(['/producto-ampliado'], { queryParams: { producto: idPro } });
  }
  addProducto(idProducto: any) {
    this.CarritoService.addProduct(idProducto);
  }

}
