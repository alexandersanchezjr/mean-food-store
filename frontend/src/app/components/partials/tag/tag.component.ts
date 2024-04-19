import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodService } from '@services/food.service';
import { Tag } from '@shared/models/Tag';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {

  tags?: Tag[];

  constructor(private foodService: FoodService) {
    this.tags = foodService.getAllTags();
  }

}
