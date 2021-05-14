import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeparturesToggleComponent} from './departures-toggle.component';

describe('DeparturesToggleComponent', () => {
  let component: DeparturesToggleComponent;
  let fixture: ComponentFixture<DeparturesToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeparturesToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparturesToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
