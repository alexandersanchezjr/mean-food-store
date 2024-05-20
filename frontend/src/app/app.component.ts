import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/partials/header/header.component";
import { HomeComponent } from '@components/pages/home/home.component';
import { LoadingComponent } from "./components/partials/loading/loading.component";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        HeaderComponent,
        HomeComponent,
        LoadingComponent
    ]
})
export class AppComponent {

  constructor() {
    console.log(environment.production)
  }

  title = 'frontend';
}
