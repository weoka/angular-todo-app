import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit, OnChanges {
  @Input() appAutofocus: boolean = true;

  constructor(private el: ElementRef<HTMLInputElement>) { }

  ngAfterViewInit(){
    this.triggerFocus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appAutofocus'] || this.el.nativeElement){
      this.triggerFocus();
    }
  }

  private triggerFocus() {
    if (this.appAutofocus && document.activeElement !== this.el.nativeElement) {
      setTimeout(() => {
        this.el.nativeElement.focus();
        this.el.nativeElement.select();
      }, 0);
    }
  }

}
