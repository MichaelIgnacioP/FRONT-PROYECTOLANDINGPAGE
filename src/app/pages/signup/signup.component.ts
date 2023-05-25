import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService,
    private router: Router
  ) { }

  signUp() {
    this.apiService.signUp(this.user)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/signin']);
      },
      err => console.log(err)
    )
  }
}
