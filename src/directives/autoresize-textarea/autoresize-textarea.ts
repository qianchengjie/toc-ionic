import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "ion-textarea[autoresize]" // Attribute selector
})
export class AutoresizeDirective {

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  @Input('autoresize') maxHeight: number;

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {
    this.adjust();
  }

  adjust(): void {
    let ta = this.element.nativeElement.querySelector("textarea"),
      newHeight;

    if (ta) {
      // ta.style.overflow = "hidden";
      ta.style.height = "23px";
      if (this.maxHeight) {
        newHeight = Math.min(ta.scrollHeight, this.maxHeight);
      } else {
        newHeight = ta.scrollHeight;
      }
      ta.style.height = newHeight + "px";
    }
  }

}