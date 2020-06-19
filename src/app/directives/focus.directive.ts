import { Directive, ElementRef, OnInit, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {

  @Input('appFocus') bindColor: string;
  defaultColor = '#0a4587';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }

  @HostListener('focus') onFocus() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', this.bindColor || this.defaultColor);
  }

  @HostListener('blur') onBlur() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', null);
  }

}
