import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'nt-select-option',
  host: {
    role: 'options',
    class: 'nt-select-option',
    '(click)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent implements OnInit {
  constructor() {}

  @Input() value: any;

  @Output() readonly onSelectionChange = new EventEmitter<any>();

  ngOnInit(): void {}

  handleClick(): void {
    console.log('Clicked');

    this.onSelectionChange.emit(this.value);
  }
}
