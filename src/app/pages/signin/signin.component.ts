import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService,
    private router: Router
  ) { }

  signIn() {
    this.apiService.signIn(this.user)
    .subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token)
        this.router.navigate(['/contact']);
      },
      (err: any) => console.log(err)
    )
  }
}
