import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss']
})
export class EvenComponent implements OnInit {

  even: number[] = [];
  sub: Subscription;
  showOddDetails = false;

  @Input() evenSubject: Subject<boolean>;
  @Input() oddSubject: Subject<boolean>;

  @Input('isRunning') set isRunning(value: boolean) {
    if (!value) {
      this.sub.unsubscribe();
    }
  }

  @Input('number$') set number$(obs: Observable<number>) {
    if (!obs) return;

    this.sub = obs
      .pipe(filter(num => num % 2 === 0))
      .subscribe(num => this.even.push(num));
  }

  constructor() { }

  ngOnInit(): void { }

}
