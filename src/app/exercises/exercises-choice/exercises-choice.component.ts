import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercises-choice',
  templateUrl: './exercises-choice.component.html',
  styleUrls: ['./exercises-choice.component.scss']
})
export class ExercisesChoiceComponent implements OnInit {
  isFormTouched:boolean=false
  formChoiceExercises:FormGroup
  @Input() exercises:Array<any>
  @Output() selectedExercises = new EventEmitter<Array<any>>()

  constructor(private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.formChoiceExercises = this.formBuilder.group({
      checkExercice:this.formBuilder.array([], [Validators.required, Validators.minLength(1)])
    })
  }

  onCheckboxChange(e:any) {
    this.isFormTouched = true

    const checkExercice: FormArray = this.formChoiceExercises.get('checkExercice') as FormArray;
    if (e.target.checked) {
      checkExercice.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkExercice.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkExercice.removeAt(i);
          return;
        }
        i++;
      });
    }
    if(checkExercice.controls.length == 0){
      this.formChoiceExercises.setErrors(Validators.required, {emitEvent:true})
    }
  }

  saveChoiceExercises(formValues:any){
    this.selectedExercises.emit(formValues)
  }

  //TODO: remplacer par un formGroup dand Home
  //fonction dans template pas recommandé
  public get isCompleted():boolean{
    return this.formChoiceExercises.valid
  }
}
