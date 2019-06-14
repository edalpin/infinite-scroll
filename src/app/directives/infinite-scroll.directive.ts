import { Directive, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, debounceTime } from 'rxjs/operators';

interface ScrollEventData {
  scrollableDistance: number;
  currentPosition: number;
}

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {
  @Output() eventFound = new EventEmitter();
  private element: any;
  private viewportHeight: number;
  private scrollEvent$: Observable<any>;
  private eventSelected$: Observable<any>;

  constructor(private elm: ElementRef) {
    this.element = elm.nativeElement;
    this.viewportHeight = window.document.documentElement.clientHeight;
  }

  ngOnInit() {
    this.scrollEvent$ = fromEvent(window.document, 'scroll').pipe(debounceTime(250));
    this.scrollListener();
  }

  scrollListener(): void {
    this.eventSelected$ = this.scrollEvent$.pipe(
      map((): ScrollEventData => ({
         scrollableDistance: this.element.getBoundingClientRect().top + window.pageYOffset + this.element.offsetHeight,
         currentPosition: window.pageYOffset + this.viewportHeight
      })),
      filter((data: ScrollEventData) => this.scrollBarCheck(data.scrollableDistance, data.currentPosition))
    );

    this.eventSelected$.subscribe(() => this.notifyEventFound());
  }

  scrollBarCheck(scrollableDistance: number, currentPosition: number): boolean {
    console.log(scrollableDistance, currentPosition);
    return currentPosition > scrollableDistance;
  }

  notifyEventFound(): void {
    this.eventFound.emit(true);
  }
}
