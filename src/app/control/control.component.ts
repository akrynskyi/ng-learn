import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Output() number = new EventEmitter<number>();
  @Output() reset = new EventEmitter<boolean>();
  status = 'Zzz...';
  count = 1;
  run = false;
  rs = false;
  intervalHandle: any;

  constructor() { }

  ngOnInit(): void {
  }

  start() {
    this.run = true;
    this.status = 'Started';
    this.reset.emit(this.rs);
    this.intervalHandle = setInterval(() => this.number.emit(this.count++), 2000);
  }

  pause() {
    this.run = false;
    this.status = 'Paused';
    clearInterval(this.intervalHandle);
  }

  stop() {
    this.run = false;
    this.status = 'Stoped';
    this.count = 1;
    this.reset.emit(!this.rs);
    clearInterval(this.intervalHandle);
  }
}
