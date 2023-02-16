import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-virtual-scroller',
  templateUrl: './virtual-scroller.component.html',
  styleUrls: ['./virtual-scroller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollerComponent implements AfterViewInit {
  height = '52px';
  itemHeight = 12;
  itemsPerViewport = 0;
  viewportHeight = 0;

  @Input()
  set items(value: any[]) {
    this.loadItems(value);
  }

  @ViewChild('container')
  container!: ElementRef;

  itemsSubject = new BehaviorSubject<any[]>([]);
  itemsToDisplay$: Observable<any[]>;

  constructor(private changeDedectionRef: ChangeDetectorRef) {
    this.itemsToDisplay$ = this.itemsSubject.asObservable();
  }
  ngAfterViewChecked(): void {
    this.changeDedectionRef.detectChanges();
  }

  loadItems(items: any[]) {
    this.itemsSubject.next(items);
  }

  ngAfterViewInit() {
    this.viewportHeight = this.container.nativeElement.offsetHeight;
    this.itemsPerViewport = Math.ceil(this.viewportHeight / this.itemHeight);
    const tmpList = this.itemsSubject
      .getValue()
      .slice(0, this.itemsPerViewport);
    this.itemsSubject.next(tmpList);
  }

  onScroll(e: Event): void {
    const scrollHeight = this.container.nativeElement.scrollHeight;
    const scrollTop = this.container.nativeElement.scrollTop;
    const itemsPerViewport = Math.ceil(this.viewportHeight / this.itemHeight);
    if (scrollTop + this.viewportHeight >= scrollHeight) {
      // this.scrollEnd.emit();
    } else {
      const firstVisibleIndex = Math.floor(scrollTop / this.itemHeight);
      const tmpList = this.itemsSubject
        .getValue()
        .slice(firstVisibleIndex, firstVisibleIndex + itemsPerViewport);
      this.itemsSubject.next(tmpList);
    }
  }
}
