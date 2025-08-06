import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

import { AuthServiceService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, InputOtpModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  verifySpinner = false;

  verfiyCode = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });
  sendverify() {
    this.verifySpinner = true;

    this.authServiceService.verifyResetCode(this.verfiyCode.value).subscribe({
      next: (resbonse) => {
        this.router.navigate(['forgotPassword/resetPassword']);
        this.verifySpinner = false;
      },
      error: (error) => {
        this.verifySpinner = false;
      },
    });
  }
}
