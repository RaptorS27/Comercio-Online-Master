import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosApiService {
  productos: any = '';
  prductosDestacados: any = '';

  constructor(private http: HttpClient) { }

  getDatos(){
    return this.productos = this.http.get('../assets/DatosComercio.json');
  }

  getDestacados(){
    if (this.prductosDestacados.length == 0){
      this.productos.forEach((producto:any) => {
        if (producto.destacado){
          this.prductosDestacados.push(producto);
        }
      });
    }
    return this.prductosDestacados;
}


}
