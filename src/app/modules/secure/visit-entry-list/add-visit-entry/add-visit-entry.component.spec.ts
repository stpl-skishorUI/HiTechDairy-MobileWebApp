import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitEntryComponent } from './add-visit-entry.component';

describe('AddVisitEntryComponent', () => {
  let component: AddVisitEntryComponent;
  let fixture: ComponentFixture<AddVisitEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddVisitEntryComponent]
    });
    fixture = TestBed.createComponent(AddVisitEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
