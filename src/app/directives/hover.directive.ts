import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @Input('appHover') options: {color: string, fontSize: string};

  defaultColor = '#e07028';
  defaultFontSize = '24px';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') onHover() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', this.options.color || this.defaultColor);
    this.renderer.setStyle(this.el.nativeElement, 'font-size', this.options.fontSize || this.defaultFontSize);
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', null);
    this.renderer.setStyle(this.el.nativeElement, 'font-size', null);
  }

}
