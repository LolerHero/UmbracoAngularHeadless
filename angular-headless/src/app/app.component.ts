import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fetchItems } from '../../utils/umbracoContentDeliveryApi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'umbraco-angular-headless';
  data = fetchItems('', '');

  constructor() {
    console.log(this.data);
  }
}
