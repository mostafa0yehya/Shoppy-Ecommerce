import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('userToken');
  if (
    (req.url.includes('cart') ||
      req.url.includes('wishlist') ||
      req.url.includes('checkout') ||
      req.url.includes('orders')) &&
    userToken
  ) {
    const request = req.clone({
      setHeaders: {
        token: userToken,
      },
    });
    return next(request);
  }

  return next(req);
};
