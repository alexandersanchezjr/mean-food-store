import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ValidationComponent } from '../validation/validation.component';

@Component({
  selector: 'app-text-input',
  standalone: true,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
  imports: [InputComponent, ValidationComponent, ReactiveFormsModule],
})
export class TextInputComponent {
  @Input()
  control!: AbstractControl;

  @Input()
  showErrorsWhen: boolean = true;

  @Input()
  label!: string;

  @Input()
  type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
}
