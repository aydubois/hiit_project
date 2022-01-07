import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IExercise } from '../exercises/exercises.model';
import { ExercisesService } from '../exercises/exercises.service';
import { IParameter } from './parameters.model';
import { ParameterService } from './parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, OnDestroy {
  form:FormGroup
  parameter:IParameter
  exercises:IExercise[]
  mySubscription:Array<any>= []
  constructor( private parameterService:ParameterService,private exerciseService:ExercisesService){  }

  ngOnInit(): void {
    this.mySubscription[0] = this.exerciseService.getSelectedExercises().subscribe((exercises:IExercise[])=>{
      this.exercises = exercises

    this.mySubscription[1] = this.parameterService.getParameter().subscribe(param =>{ 
        this.parameter = param
        this.form = new FormGroup({
          rounds:new FormControl(this.parameter.rounds,[Validators.required, Validators.min(exercises.length)]),
          work_period_minute:new FormControl(this.parameter.work_period_minute,[Validators.required, Validators.max(59), Validators.min(0)]),
          work_period_seconde:new FormControl(this.parameter.work_period_seconde,[Validators.required, Validators.max(59), Validators.min(0)]),
          rest_period_minute:new FormControl(this.parameter.rest_period_minute,[Validators.required, Validators.max(59), Validators.min(0)]),
          rest_period_seconde:new FormControl(this.parameter.rest_period_seconde,[Validators.required, Validators.max(59), Validators.min(0)]),
        })
      })
    })
  }

  save(formValue:IParameter){
    this.parameterService.saveParameter(formValue)
  }

  ngOnDestroy(): void {
      if(this.mySubscription.length != 0){
        this.mySubscription.forEach(sub => {
          sub.unsubscribe()
        });
      }
  }
}
