import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { NgIf } from '@angular/common';
import { UserService } from '@services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from "../../partials/input/input.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule, TitleComponent, NgIf, InputComponent]
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.userService.login({
      email: this.formControls['email'].value,
      password: this.formControls['password'].value,
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
