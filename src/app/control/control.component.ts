import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Output() number = new EventEmitter<number>();
  status = 'Zzz...';
  count = 1;
  intervalHandle: any;

  constructor() { }

  ngOnInit(): void {
  }

  start() {
    this.status = 'Started';
    this.intervalHandle = setInterval(() => this.number.emit(this.count++), 2000);
  }

  stop() {
    this.status = 'Stoped';
    clearInterval(this.intervalHandle);
  }
}
