import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosApiService } from '../productos-api.service';

@Component({
  selector: 'app-produc-ampliado',
  templateUrl: './produc-ampliado.component.html',
  styleUrls: ['./produc-ampliado.component.css']
})
export class ProducAmpliadoComponent implements OnInit {
  idproducto: any = '';
  produc: any = '';
  productoSeleccionado: any = '';

  constructor(private route: ActivatedRoute, private ProductosService: ProductosApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idproducto = +params['producto'];
    });
    this.getDatos();
  }

  limpiarCuadro() {
    let div = document.querySelectorAll('.productosPrincipal');
    div[0].innerHTML = '';
  }

  getDatos() {
    this.limpiarCuadro();
    this.ProductosService.getDatos().subscribe((respuesta) => {
      this.produc = respuesta;
      for (let i = 0; i < this.produc.length; i++) {
        for (let x = 0; x < this.produc[i].productos.length; x++) {
          if (this.produc[i].productos[x].id == this.idproducto) {
            this.productoSeleccionado = this.produc[i].productos[x];
          }
        }
      }
      console.log(this.productoSeleccionado);
    });

  }

}
