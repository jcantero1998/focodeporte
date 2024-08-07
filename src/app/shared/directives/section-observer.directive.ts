import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appSectionObserver]',
  standalone: true
})
export class SectionObserverDirective {
  @Output() sectionChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.sectionChange.emit(this.el.nativeElement.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.el.nativeElement);
  }
}
