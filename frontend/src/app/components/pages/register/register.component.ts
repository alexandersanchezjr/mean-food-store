import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '@components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { UserService } from '@services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordMatchValidator } from '@shared/validator/password_match_validator';
import { IUserRegister } from '@shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    ReactiveFormsModule,
    TitleComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RouterModule
  ],
})
export class RegisterComponent {
  registerForm!: FormGroup<any>;
  isSubmitted: boolean = false;
  returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.minLength(10)]],
      },
      { validators: PasswordMatchValidator('password', 'confirmPassword') }
    );

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    if (this.registerForm.invalid) return;

    const formValues = this.registerForm.value;

    const user: IUserRegister = {
      name: formValues['name'],
      email: formValues['email'],
      password: formValues['password'],
      confirmPassword: formValues['confirmPassword'],
      address: formValues['address'],
    };

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
