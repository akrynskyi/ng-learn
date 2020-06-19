import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHide]'
})
export class HideDirective {

  hasView = false;

  constructor(
    private tempRef: TemplateRef<any>,
    private viewContRef: ViewContainerRef
  ) { }

  @Input() set appHide(value: boolean) {
    if(value && !this.hasView) {
      this.viewContRef.createEmbeddedView(this.tempRef);
      this.hasView = true;
    }

    if (!value && this.hasView) {
      this.viewContRef.clear();
      this.hasView = false;
    }
  }

}
