import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [NgStyle, CurrencyPipe],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {

  constructor() {

  }

  @Input() title!: string;

  @Input() margin? = '1rem 0 1rem 0.2rem';

  @Input() fontSize? = '1.7rem';
}
