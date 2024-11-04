import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private cookieService: CookieService) {}


  onSubmit() {
    const { email, password } = this.signinForm.value;
    this.authService.signIn(email, password).then(
      response => {
        this.cookieService.set('refreshToken', response._tokenResponse.refreshToken);
        console.log('Login successful', response);
      }
    ).catch(
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
