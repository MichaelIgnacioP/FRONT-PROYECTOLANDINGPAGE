import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contact = {
    fullname: '',
    email: '',
    description: ''
  }

  constructor(
    private tostrSvc: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) { }

  sendMess() {
    this.apiService.sendMess(this.contact).subscribe(
      res => {
        if (res.message === 'Notificación de contacto almacenada exitosamente') {
          this.tostrSvc.success(`Haz enviado el mensaje con éxito`, 'Éxito!.');
          this.router.navigate(['/landingpage']);
        } else if (res.message === 'Campos mal ingresados') {
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