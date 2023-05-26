import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  user = {
    email: '',
    password: ''
  }

  constructor(
    private tostrSvc: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) { }

  signIn() {
    this.apiService.signIn(this.user).subscribe(
      res => {
        if (res.message === 'Éxito!') {
          console.log(this.user.email, 'Login exitoso');
          localStorage.setItem('token', res.token)
          this.tostrSvc.success(`Haz iniciado sesión con éxito`, 'Éxito!.');
          this.router.navigate(['/contact']);
        } else if (res.message === 'Credenciales incorrectas o el usuario no esta registrado') {
          console.log('Otro estado de respuesta:', res.status);
          this.tostrSvc.error('Error!', 'Por favor vuelve a intentar.');
        }
      },
      error => {
        console.log('Error en la solicitud:', error);
        this.tostrSvc.error('Error!', 'Por favor vuelve a intentar.');
      }
    );
  }


}