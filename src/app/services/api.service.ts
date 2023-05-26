import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpHandler, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api_url: string = 'https://' + environment.apiURL;
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error en la solicitud';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error: ${error.status}: ${error.error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

  //////////////////////////////////////////////////////////////
  //////////////////////////// GET /////////////////////////////
  //////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////
  /////////////////////////// POST /////////////////////////////
  //////////////////////////////////////////////////////////////

  signUp(user: any) {
    return this.http.post<any>(`${this.api_url}/register`, user);
  }

  signIn(user: any) {
    return this.http.post<any>(`${this.api_url}/login`, user);
  }

  sendMess(contact: any) {
    return this.http.post<any>(`${this.api_url}/contact`, contact);
  }

  //////////////////////////////////////////////////////////////
  ///////////////////////// UPDATE /////////////////////////////
  //////////////////////////////////////////////////////////////





}



