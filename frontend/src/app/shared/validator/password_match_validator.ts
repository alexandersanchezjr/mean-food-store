import { AbstractControl } from '@angular/forms';

export const PasswordMatchValidator = (
  controlName: string,
  matchingControlName: string
) => {
  const validator = (form: AbstractControl) => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);

    if (!control || !matchingControl) return;

    if (matchingControl.value !== control.value) {
      matchingControl.setErrors({ passwordMismatch: true });
    } else {
      const errors = matchingControl.errors;

      if (!errors) return;

      delete errors['passwordMismatch'];
      matchingControl.setErrors(errors);
    }
  };

  return validator;
};
