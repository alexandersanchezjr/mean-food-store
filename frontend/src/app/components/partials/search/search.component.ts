import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  nameInSearch: string = ''

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe(
      (params) => {
        if(params['name']) this.nameInSearch = params['name']
      }
    )
  }

  search(name: string): void {
    if(name)
      this.router.navigateByUrl('/search/' + name)
  }


}
