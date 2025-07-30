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
  selector: 'app-send-email',
  imports: [ReactiveFormsModule, FloatLabel, InputTextModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css',
})
export class SendEmailComponent {
  email = '';

  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  showSpin = false;
  sendCode = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  sendCodeStep() {
    this.showSpin = true;
    console.log(this.sendCode);
    let emailValue = this.sendCode.controls.email.value;
    this.authServiceService.forgotPassword(this.sendCode.value).subscribe({
      next: (resbonse) => {
        this.showSpin = false;
        if (emailValue) {
          localStorage.setItem('userEmail', emailValue);
        }
        this.router.navigate(['forgotPassword/verifyCode']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.showSpin = false;
      },
    });
  }
}
