import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  onSubmit() {
    const { email, password } = this.signinForm.value;
    this.authService.signUp(email, password).then(
      response => {
        console.log('Signin successful', response);
      }
    ).catch(
      error => {
        console.error('Signin failed', error);
      }
    );
  }
}
