import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IExercise } from "./exercises.model";

@Injectable()
export class ExercisesService{
    private selectedExercises:IExercise[] = []
    private subjectAll:Subject<IExercise[]> =  new Subject<IExercise[]>()
    private subjectSelected:Subject<IExercise[]> =  new Subject<IExercise[]>()
    getAllExercises():Subject<IExercise[]>{
        // let subject:Subject<IExercise[]> =  new Subject<IExercise[]>()
        setTimeout(()=>{
            this.subjectAll.next(EXERCISES)
        },100)
        return this.subjectAll
    }

    getSelectedExercises():Subject<IExercise[]>{
        //let subject:Subject<IExercise[]> =  new Subject<IExercise[]>()

        setTimeout(()=>{
            this.subjectSelected.next(this.selectedExercises)
        },100)
        return this.subjectSelected
    }

    saveSelectedExercisesByValue(exercises:string[]):Subject<IExercise[]>{
        this.selectedExercises = []
        EXERCISES.forEach(exercise => {
            if(exercises.includes(exercise.value)){
                this.selectedExercises.push(exercise)
            }
        })
        // let subject:Subject<IExercise[]> =  new Subject<IExercise[]>()
        setTimeout(()=>{
            this.subjectSelected.next(this.selectedExercises)
        },100)
        return this.subjectSelected
    }
    saveSelectedExercises(exercises:IExercise[]):Subject<IExercise[]>{
        this.selectedExercises = exercises
        setTimeout(()=>{
            this.subjectSelected.next(this.selectedExercises)
        },100)
        return this.subjectSelected
    }
}

const EXERCISES:IExercise[] = [
    {name:'Climbers',value:'climbers', url:'assets/climbers.PNG'},
    {name:'High Knees',value:'high_knees', url:'assets/high_knees.PNG'},
    {name:'Jump Squats',value:'jump_squats', url:'assets/jump_squats.PNG'},
    {name:'Jumping Jacks',value:'jumping_jacks', url:'assets/jumping_jacks.PNG'},
    {name:'Plank Crunches',value:'plank_crunches', url:'assets/plank_crunches.PNG'},
    {name:'Plank Hold',value:'plank_hold', url:'assets/plank_hold.PNG'},
  ]