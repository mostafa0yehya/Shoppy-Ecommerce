import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
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
import { BrandsComponent } from './pages/brands/brands.component';
import { SingleBrandComponent } from './pages/single-brand/single-brand.component';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    //  canActivate: [authGuard]
  },
  {
    path: 'productDetails/:id',
    component: ProductDetailsComponent,
    // canActivate: [authGuard],
  },
  { path: 'brands', component: BrandsComponent },

  {
    path: 'brand/:id',
    component: SingleBrandComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'favourites',
    canActivate: [authGuard],
    component: FavouritesComponent,
  },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  {
    path: 'checkOut/:id/:type',
    canActivate: [authGuard],
    component: CheckOutComponent,
  },

  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
  },
  {
    path: 'register',
    canActivate: [noAuthGuard],
    component: RegisterComponent,
  },
  { path: 'login', canActivate: [noAuthGuard], component: LoginComponent },

  {
    path: 'forgotPassword',

    component: ForgotPasswordComponent,
    canActivate: [noAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'sendEmail',
        pathMatch: 'full',
      },
      { path: 'sendEmail', component: SendEmailComponent },
      { path: 'verifyCode', component: VerifyCodeComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
