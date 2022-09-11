import { Component } from '@angular/core';
import {MainService} from "./services/main.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private mainService: MainService) {
    console.log('begin authenticate')
    mainService.authenticate();
  }

  title = 'client';
}
