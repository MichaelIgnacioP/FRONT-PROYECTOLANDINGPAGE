import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api_url: string = environment.apiURL;
  api: any;

  constructor( 
    private http: HttpClient,
    private router: Router
  ) { }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
    return next.handle(tokenReq);
  }

  //////////////////////////////////////////////////////////////
  //////////////////////////// GET /////////////////////////////
  //////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////
  /////////////////////////// POST /////////////////////////////
  //////////////////////////////////////////////////////////////

  signUp(user: any) {
    return this.http.post<any>(this.api_url + '/register', user);
  }

  signIn(user: any) {
    return this.http.post<any>(this.api_url + '/login', user);
  }

  //////////////////////////////////////////////////////////////
  ///////////////////////// UPDATE /////////////////////////////
  //////////////////////////////////////////////////////////////





}



