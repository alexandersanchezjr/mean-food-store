import {
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { tap } from 'rxjs/internal/operators/tap';

var pendingRequests = 0;
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.showLoading();
  pendingRequests = pendingRequests + 1;

  const handleHideLoading = () => {
    pendingRequests = pendingRequests - 1;
    if (pendingRequests === 0) {
      loadingService.hideLoading();
    }
  };

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          handleHideLoading();
        }
      },
      error: (_) => {
        handleHideLoading();
      },
    })
  );
};


