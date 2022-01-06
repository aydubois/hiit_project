import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IParameter } from './parameters.model';
import { ParameterService } from './parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
  form:FormGroup=new FormGroup({
    rounds:new FormControl(),
    work_period_minute:new FormControl(),
    work_period_seconde:new FormControl(),
    rest_period_minute:new FormControl(),
    rest_period_seconde:new FormControl()
  })
  parameter:IParameter

  @Input() isStarted:boolean
  constructor( private parameterService:ParameterService){  }

  ngOnInit(): void {
    this.parameterService.getParameter().subscribe(param =>{ 
      this.parameter = param
      this.form = new FormGroup({
        rounds:new FormControl(this.parameter.rounds,[Validators.required, Validators.min(1)]),
        work_period_minute:new FormControl(this.parameter.work_period_minute,[Validators.required, Validators.max(59), Validators.min(0)]),
        work_period_seconde:new FormControl(this.parameter.work_period_seconde,[Validators.required, Validators.max(59), Validators.min(0)]),
        rest_period_minute:new FormControl(this.parameter.rest_period_minute,[Validators.required, Validators.max(59), Validators.min(0)]),
        rest_period_seconde:new FormControl(this.parameter.rest_period_seconde,[Validators.required, Validators.max(59), Validators.min(0)]),
      })
    })
  }
  save(formValue:IParameter){
    this.parameterService.saveParameter(formValue)
  }

}