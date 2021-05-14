import {
  Component,
  ContentChildren,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import {defer, merge, Observable} from 'rxjs';
import {concatAll, startWith, switchMap, take} from 'rxjs/operators';
import {SelectOptionComponent} from './select-option.component';

@Component({
  selector: 'nt-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent implements OnInit {
  @ContentChildren(SelectOptionComponent, {descendants: true}) options =
    new QueryList<SelectOptionComponent>();

  readonly optionSelectionChanges: Observable<any> = defer(() => {
    const options = this.options;

    if (options) {
      return options.changes.pipe(
        startWith(options),
        switchMap(() =>
          merge(...options.map(option => option.onSelectionChange))
        )
      );
    }

    return this._ngZone.onStable.pipe(
      take(1),
      switchMap(() => this.optionSelectionChanges)
    );
  }) as Observable<any>;

  @Output() readonly selectionChange: EventEmitter<any> =
    new EventEmitter<any>();

  constructor(private _ngZone: NgZone) {}

  ngAfterContentInit(): void {
    console.log(this.optionSelectionChanges);

    this.optionSelectionChanges.subscribe(change => {
      console.log(change);
      this.selectionChange.emit(change);
    });
  }

  ngOnInit() {}
}
