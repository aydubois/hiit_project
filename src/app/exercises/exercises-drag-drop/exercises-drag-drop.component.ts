import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IExercise } from '../exercises.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-exercises-drag-drop',
  templateUrl: './exercises-drag-drop.component.html',
  styleUrls: ['./exercises-drag-drop.component.scss']
})
export class ExercisesDragDropComponent implements OnInit {

  @Input() selectedExercises:IExercise[]
  @Output() selectedExercisesChange:EventEmitter<IExercise[]> = new EventEmitter<IExercise[]>()
  constructor() { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedExercises, event.previousIndex, event.currentIndex);
  }
  saveSelectedExercises(){
    console.log(this.selectedExercises)
    this.selectedExercisesChange.emit(this.selectedExercises)
  }
}
