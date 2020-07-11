import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  evenSubject = new Subject<boolean>();
  oddSubject = new Subject<boolean>();
  numberObservable: Observable<number> = null;
  isRunning = true;
  isComplete = '';

  constructor() { }

  ngOnInit(): void { }

  action(value: boolean) {
    if (!value) {
      this.isRunning = false;
      return;
    }

    this.isRunning = true;
    this.isComplete = '';

    this.numberObservable = new Observable(obs => {
      let count = 1;

      const interval = setInterval(() => {
        obs.next(count++)

        if (!(count === 10)) return;

        obs.complete();
        this.isComplete = 'Complete';
      }, 1000);

      // clear interval when unsubscribe()
      return () => clearInterval(interval);
    });
  }
}
