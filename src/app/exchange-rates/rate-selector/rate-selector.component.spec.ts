import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSelectorComponent } from './rate-selector.component';

describe('RateSelectorComponent', () => {
  let component: RateSelectorComponent;
  let fixture: ComponentFixture<RateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
