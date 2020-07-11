import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  status = 'Zzz...';
  run = false;

  @Output() control = new EventEmitter<boolean>();

  @Input('isComplete') set isComplete(value: string) {
    if(!value) return;
    this.status = value;
    this.run = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

  start() {
    this.run = true;
    this.status = 'Started';
    this.control.emit(this.run);
  }

  stop() {
    this.run = false;
    this.status = 'Stoped';
    this.control.emit(this.run);
  }
}
