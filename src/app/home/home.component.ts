import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExercisesChoiceComponent } from '../exercises/exercises-choice/exercises-choice.component';
import { IExercise } from '../exercises/exercises.model';
import { ExercisesService } from '../exercises/exercises.service';
import { ParametersComponent } from '../parameters/parameters.component';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  @ViewChild('ExercisesChoiceComponent') exercisesChoiceComponent: ExercisesChoiceComponent;
  @ViewChild('Parameters')parametersComponent: ParametersComponent;
  formParameter:FormGroup

  exercises:IExercise[]
  selectedExercises:IExercise[]

  isStarted:boolean
  isFormTouched:boolean=false

  mySubscription:any

  constructor(private exercisesService:ExercisesService, private cdr :ChangeDetectorRef) {}

  ngOnInit(): void {
    this.mySubscription = this.exercisesService.getAllExercises().subscribe((exercises:IExercise[]) => {
      this.exercises = exercises
    })
  }

  ngAfterViewInit(){
    this.formParameter = this.parametersComponent.form;
    this.cdr.detectChanges();
  }

  saveSelectedExercises(event:any){
    this.exercisesService.saveSelectedExercisesByValue(event?.checkExercice).subscribe((selectedExercises:IExercise[])=>{
      this.selectedExercises = selectedExercises
    })
  }

  onSelectedExercisesChange(selectedExercises:IExercise[]){
    if(this.selectedExercises != selectedExercises){
      this.exercisesService.saveSelectedExercises(selectedExercises)
      this.selectedExercises = selectedExercises
    }
  }

  ngOnDestroy(){
    if( this.mySubscription !== undefined && !this.mySubscription.closed){
      this.mySubscription.unsubscribe()
    }
  }


}
