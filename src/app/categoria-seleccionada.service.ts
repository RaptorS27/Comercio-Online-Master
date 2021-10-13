import { ThrowStmt } from '@angular/compiler';
import { ElementRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSeleccionadaService {
  private subject = new Subject<any>();
  RefDiv:ElementRef;
  constructor() { };


  guardarCategoria(categoria: string) {
    localStorage.setItem('catego', 'categoria');
    this.subject.next({ cate: categoria });
  }

  getCategoria(): Observable<any> {
    return this.subject.asObservable();
  }

  setRefDiv(RefDiv:ElementRef) {
    this.RefDiv = RefDiv;
  }
  getRefDiv() {
    return this.RefDiv;
  }


}
