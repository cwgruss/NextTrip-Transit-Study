import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransitFilterComponent} from './transit-filter.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TransitFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '', // Load the TransitFilterComponent by default
        pathMatch: 'full',
        component: TransitFilterComponent,
      },
    ]),
  ],
})
export class TransitRouteFilterModule {}
