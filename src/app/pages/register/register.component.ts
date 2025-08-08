import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { passwordMatch } from '../../shared/validators/passwordValidator';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FloatLabel, InputTextModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  formInputs = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9._ ]*(?<![._ ])$'),
        Validators.minLength(5),
        Validators.maxLength(19),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]).{8,}$'
        ),
        Validators.required,
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.pattern('^01[0125][0-9]{8}$'),
        Validators.required,
      ]),
    },
    { validators: passwordMatch }
  );
  showSpinner = false;
  private subscription!: Subscription;

  handelsignUp() {
    this.showSpinner = true;
    if (this.formInputs.valid) {
      this.subscription = this.authServiceService
        .signUp(this.formInputs.value)
        .subscribe({
          next: (resbonse) => {
            this.router.navigate(['/login']);

            this.formInputs.reset();
            this.showSpinner = false;
          },
          error: (error) => {
            this.showSpinner = false;
          },
          complete: () => {},
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
