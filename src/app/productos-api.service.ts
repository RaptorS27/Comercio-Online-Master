import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosApiService {
  
  constructor(private http: HttpClient) { }

  getDatos(){
    return this.http.get('../assets/DatosComercio.json');
  }

  
}
