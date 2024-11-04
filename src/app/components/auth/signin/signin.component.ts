import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  onSubmit() {
    const { email, password } = this.signinForm.value;
    this.authService.signUp(email, password).then(
      response => {
        this.cookieService.set('refreshToken', response.refreshToken);
        this.cookieService.set('accessToken', response.accessToken);
        console.log('Signup successful', response);
      }
    ).catch(
      error => {
        console.log('Signup failed', error);
      }
    );
  }
}
