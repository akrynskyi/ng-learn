import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  even: number[] = [];
  odd: number[] = [];

  constructor() { }

  getNum(num: number) {
    if(num % 2 === 0) {
      this.even.push(num);
    } else {
      this.odd.push(num);
    }
  }
}
