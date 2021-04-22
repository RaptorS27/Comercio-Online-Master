import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSeleccionadaService {
  private subject = new Subject<any>();
  constructor() { };


  guardarCategoria(categoria: string) {
    localStorage.setItem('catego','categoria');
    this.subject.next({ cate: categoria });
  }
  
  getCategoria(): Observable<any> {
      return this.subject.asObservable();
    }

}
