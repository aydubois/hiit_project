import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesChoiceComponent } from './exercises-choice.component';

describe('ExercisesChoiceComponent', () => {
  let component: ExercisesChoiceComponent;
  let fixture: ComponentFixture<ExercisesChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
