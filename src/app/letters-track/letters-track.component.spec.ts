import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersTrackComponent } from './letters-track.component';

describe('LettersTrackComponent', () => {
  let component: LettersTrackComponent;
  let fixture: ComponentFixture<LettersTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
