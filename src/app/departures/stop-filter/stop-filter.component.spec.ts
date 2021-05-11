import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopFilterComponent } from './stop-filter.component';

describe('StopFilterComponent', () => {
  let component: StopFilterComponent;
  let fixture: ComponentFixture<StopFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
