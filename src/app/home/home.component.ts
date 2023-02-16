import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
  items: any[] = [
    { name: 'Gayan' },
    { name: 'Sahan' },
    { name: 'Buddhika' },
    { name: 'Nuwan' },
    { name: 'Isuru' },
    { name: 'Naleen' },
    { name: 'Asanka' },
  ];
}
