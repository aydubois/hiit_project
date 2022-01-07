import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ExercisesChoiceComponent } from '../exercises/exercises-choice/exercises-choice.component';
import { IExercise } from '../exercises/exercises.model';
import { ExercisesService } from '../exercises/exercises.service';
import { ParametersComponent } from '../parameters/parameters.component';
import { ParameterService } from '../parameters/parameters.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  isStarted:boolean
  isFormTouched:boolean=false

  @ViewChild('ExercisesChoiceComponent') exercisesChoiceComponent: ExercisesChoiceComponent;
  @ViewChild('Parameters')parametersComponent: ParametersComponent;
  formParameter:FormGroup
  exercises:IExercise[]
  selectedExercises:IExercise[]

  constructor(private exercisesService:ExercisesService, private cdr :ChangeDetectorRef) {}

  ngOnInit(): void {
    this.exercisesService.getAllExercises().subscribe((exercises:IExercise[]) => {
      this.exercises = exercises
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log("changes", changes)
  }
  startEvent(event:boolean){
    this.isStarted = event
  }

  saveSelectedExercises(event:any){
    this.exercisesService.saveSelectedExercisesByValue(event?.checkExercice).subscribe((selectedExercises:IExercise[])=>{
      this.selectedExercises = selectedExercises
    })
  }

  onSelectedExercisesChange(selectedExercises:IExercise[]){
    console.log(this.selectedExercises, selectedExercises)
    if(this.selectedExercises != selectedExercises){
      this.exercisesService.saveSelectedExercises(selectedExercises)
      this.selectedExercises = selectedExercises
    }
  }


  ngAfterViewInit(){
    this.formParameter = this.parametersComponent.form;
    this.cdr.detectChanges();
  }

}
