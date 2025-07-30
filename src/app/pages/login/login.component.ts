import { Component, OnDestroy } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router,
    private cartService: CartService
  ) {}

  subscription!: Subscription;

  errorFromApi = '';
  showSpinner = false;
  formObj = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  handelLogin() {
    this.showSpinner = true;

    if (this.formObj.valid) {
      this.subscription = this.authServiceService
        .login(this.formObj.value)
        .subscribe({
          next: (response) => {
            localStorage.setItem('userToken', response.token);
            this.router.navigate(['/home']);
            this.showSpinner = false;
            this.authServiceService.isLoggedIn.next(true);
            this.cartService.updateNumberOfCartItems();
          },
          error: (error) => {
            this.showSpinner = false;
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
