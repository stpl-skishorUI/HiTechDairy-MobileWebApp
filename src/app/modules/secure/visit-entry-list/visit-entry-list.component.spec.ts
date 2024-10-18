import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitEntryListComponent } from './visit-entry-list.component';

describe('VisitEntryListComponent', () => {
  let component: VisitEntryListComponent;
  let fixture: ComponentFixture<VisitEntryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VisitEntryListComponent]
    });
    fixture = TestBed.createComponent(VisitEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
