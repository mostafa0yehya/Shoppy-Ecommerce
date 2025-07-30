import { Component, inject, OnInit } from '@angular/core';
import AOS from 'aos';
import { NavbarComponent } from './shared/components/business/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FooterComponent } from './shared/components/business/footer/footer.component';
import { AuthServiceService } from './core/services/auth-service.service';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    RouterOutlet,
    ToastModule,
    NgxSpinnerComponent,
    FooterComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthServiceService);
  isLogin = false;
  ngOnInit() {
    this.authService.isLoggedIn.subscribe({
      next: (value) => {
        this.isLogin = value;
      },
    });
    AOS.init();
  }
  constructor(private router: Router) {}

  title = 'shoppy_ecommerce';
}
