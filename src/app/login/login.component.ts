import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouterEvent } from '@angular/router';
import { ApiUserService } from '../api-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  usuario: string = '';
  password: string = '';
  mostrar: boolean = false;

  constructor(private ApiUserService: ApiUserService, private router: Router) { }

  ngOnInit(): void {
  }

  userAuth() {
    var resBoll = this.ApiUserService.authUsers(this.usuario, this.password);
    if (resBoll) {
      this.router.navigate(['inicio']);
    } else {
      this.mostrar = true;
    }

  }
}
