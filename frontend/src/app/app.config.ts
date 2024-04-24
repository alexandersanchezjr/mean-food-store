import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { LoadingService } from '@services/loading.service';
import { loadingInterceptor } from '@shared/interceptors/loading.interceptor';
import { authInterceptor } from '@shared/interceptors/auth.interceptor';
import { provideNgxStripe } from 'ngx-stripe';
import { environment } from 'environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideNgxStripe(environment.stripeKey),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
    provideRouter(routes),
    importProvidersFrom(
      StarRatingModule.forRoot(),
      HttpClientModule,
      LoadingService
    ),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
  ],
};
