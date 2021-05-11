import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DeparturesToggleComponent} from './departures-toggle/departures-toggle.component';
import {DepaturesRoutingModule} from './depatures-routing.module';

@NgModule({
  declarations: [DeparturesToggleComponent],
  imports: [CommonModule, DepaturesRoutingModule],
  exports: [DeparturesToggleComponent],
})
export class DeparturesModule {}
