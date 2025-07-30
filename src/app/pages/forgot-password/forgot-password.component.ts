import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  // imports: [ReactiveFormsModule, NgOtpInputModule, RouterOutlet],
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.navigate(['/forgotPassword/sendEmail']);
  }
}
