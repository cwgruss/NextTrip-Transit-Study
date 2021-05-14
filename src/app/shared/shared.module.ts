import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectListComponent} from './select-list/select-list.component';
import {SelectOptionComponent} from './select-list/select-option.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SelectListComponent, SelectOptionComponent],
  exports: [SelectListComponent, SelectOptionComponent],
})
export class SharedModule {}
