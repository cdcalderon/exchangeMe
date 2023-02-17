import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalAnalizerComponent } from './signal-analizer.component';

describe('SignalAnalizerComponent', () => {
  let component: SignalAnalizerComponent;
  let fixture: ComponentFixture<SignalAnalizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalAnalizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalAnalizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
