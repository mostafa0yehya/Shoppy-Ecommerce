import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FloatLabel, InputTextModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}
  resetSpinner = false;
  userEmail = localStorage.getItem('userEmail');
  newPassword = new FormGroup({
    email: new FormControl(localStorage.getItem('userEmail'), [
      (Validators.required, Validators.email),
    ]),

    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]).{8,}$'
      ),
    ]),
  });
  restPassword() {
    this.resetSpinner = true;
    console.log(this.newPassword.value);

    this.authServiceService.resetPassword(this.newPassword.value).subscribe({
      next: (resbonse) => {
        this.router.navigate(['/login']);
        this.resetSpinner = false;
        console.log(resbonse);
      },
      error: (error) => {
        console.log(error);
        this.resetSpinner = false;
      },
    });
  }
}
