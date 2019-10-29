import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSummaryComponent } from './mini-summary.component';

describe('MiniSummaryComponent', () => {
  let component: MiniSummaryComponent;
  let fixture: ComponentFixture<MiniSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
