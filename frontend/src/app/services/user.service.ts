import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { User } from '@shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '@shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '@shared/interfaces/IUserRegister';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public userObservable: Observable<User>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.userSubject = new BehaviorSubject(this.getUserFromLocalStorage());
    this.userObservable = this.userSubject.asObservable();
  }

  get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(`${SERVER_URL}${LOGIN_PATH}`, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success('Welcome ' + user.name, 'Login successful');
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Login failed');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(`${SERVER_URL}${REGISTER_PATH}`, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success('Welcome ' + user.name, 'Registration successful');
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Registration failed');
        },
      })
    );
  }

  logout(): void {
    this.userSubject.next(new User());
    if (this.isBrowser) {
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }
  }

  private setUserToLocalStorage(user: User): void {
    if (this.isBrowser) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    if (this.isBrowser) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) return JSON.parse(userJson) as User;
    }
    return new User();
  }
}

const SERVER_URL = environment.serverUrl;
const LOGIN_PATH = environment.loginPath;
const REGISTER_PATH = environment.registerPath;
const USER_KEY = 'user';
