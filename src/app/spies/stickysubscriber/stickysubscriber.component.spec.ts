import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickySubscriberComponent } from './stickysubscriber.component';

describe('StickysubscriberComponent', () => {
  let component: StickySubscriberComponent;
  let fixture: ComponentFixture<StickySubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickySubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickySubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
