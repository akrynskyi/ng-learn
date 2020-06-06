import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name = '';
  details = false;
  number = 0;
  numbers: number[] = [];

  constructor() { }

  onClick() {
    this.details = !this.details;
    this.number++;
    this.numbers.push(this.number);
  }
}
