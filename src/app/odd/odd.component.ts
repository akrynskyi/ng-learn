import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.scss']
})
export class OddComponent implements OnInit {

  odd: number[] = [];
  sub: Subscription;
  showEvenDetails = false;

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
      .pipe(filter(num => !(num % 2 === 0)))
      .subscribe(num => this.odd.push(num));
  }

  constructor() { }

  ngOnInit(): void { }

}
