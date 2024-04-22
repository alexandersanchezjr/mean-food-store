import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  if (userService.currentUser.token) return true;
  else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
