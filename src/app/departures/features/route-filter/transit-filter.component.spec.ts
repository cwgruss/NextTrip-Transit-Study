import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransitFilterComponent} from './transit-filter.component';

describe('TransitFilterComponent', () => {
  let component: TransitFilterComponent;
  let fixture: ComponentFixture<TransitFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransitFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
