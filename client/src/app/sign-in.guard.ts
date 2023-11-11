/**
 * Title: sign-in.guard.ts
 * Author: Tiffany Reyes
 * Date: 10 Nov 2023
 * Description: sign-in guard
 */

// exporting book class elements
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const signInGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);

  const sessionUser = cookieService.get('empId');
  if (sessionUser) {
    return true;
  }
  else {
    const router = inject(Router);
    router.navigate(['/sign-in']);
    return false;
  }
};
