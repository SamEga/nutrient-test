import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { SearchService } from './search.service';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { Repositories } from '../../data/data.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchRef') searchRef: ElementRef;
  @Output() searchEmit: EventEmitter<any> = new EventEmitter();
  keyup$: Observable<any>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initEvent();
  }

  initEvent() {
    this.keyup$ = fromEvent(this.searchRef.nativeElement, 'keyup');
    this.keyup$
      .pipe(
        debounceTime(500),
        switchMap((e: KeyboardEvent) =>
          this.searchService.getRepositories((e.target as HTMLInputElement).value)
        ),
        distinctUntilChanged()
      )
      .subscribe((e: Repositories) => {
        this.searchEmit.emit(e.items);
      });
  }
}
