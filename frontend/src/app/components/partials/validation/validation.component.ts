import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [ NgIf, NgFor ],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css',
})
export class ValidationComponent {
  @Input()
  control!: AbstractControl;

  @Input()
  showErrorsWhen: boolean = true;

  errorMessages: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  ngOnChanges() {
    this.checkValidation();
  }

  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorsKeys = Object.keys(errors);

    const validationMessagesIndex =
      ValidationMessages as ValidationMessagesType;

    this.errorMessages = errorsKeys.map((key) => validationMessagesIndex[key]);
  }
}

enum ValidationMessages {
  required = 'This field is required',
  email = 'Must be a valid email address',
  minlength = 'Must be at least 6 characters',
  passwordMismatch = 'Passwords must match',
}

type ValidationMessagesType = {
  [key: string]: string;
};
