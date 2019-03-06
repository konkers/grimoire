import { Component } from '@angular/core';
import { Ff4Service } from './ff4.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grimoire';

  constructor(private ff4Service: Ff4Service) {
  }
}
