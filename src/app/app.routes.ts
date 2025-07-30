import { Routes, withComponentInputBinding } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './shared/components/business/reset-password/reset-password.component';
import { SendEmailComponent } from './shared/components/business/send-email/send-email.component';
import { VerifyCodeComponent } from './shared/components/business/verify-code/verify-code.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  {
    path: 'productDetails/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
  },

  { path: 'contact', component: ContactComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  {
    path: 'category/:id',
    component: CategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
  },
  {
    path: 'checkOut/:id/:type',
    canActivate: [authGuard],
    component: CheckOutComponent,
  },
  {
    path: 'favourites',
    canActivate: [authGuard],
    component: FavouritesComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    children: [
      { path: 'sendEmail', component: SendEmailComponent },
      { path: 'verifyCode', component: VerifyCodeComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
