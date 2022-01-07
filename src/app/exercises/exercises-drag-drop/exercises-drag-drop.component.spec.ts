import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesDragDropComponent } from './exercises-drag-drop.component';

describe('ExercisesDragDropComponent', () => {
  let component: ExercisesDragDropComponent;
  let fixture: ComponentFixture<ExercisesDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesDragDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
