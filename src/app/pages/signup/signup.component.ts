import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  }

  constructor(
    private tostrSvc: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) { }

  signUp() {
    this.apiService.signUp(this.user).subscribe(
      res => {
        if (res.message === 'Usuario registrado exitosamente') {
          console.log('Registro exitoso');
          this.tostrSvc.success(`${this.user.email} Creado con éxito!`, 'Por favor inicia sesión.');
          this.router.navigate(['/signin']);
        } else if (res.message === 'El usuario ya existe') {
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
