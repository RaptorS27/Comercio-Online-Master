import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) { }

  authUsers(user:string,passwd:string){
    if (user == 'admin' && passwd == 'admin'){
      return true;
    }else{return false}
  }
}
