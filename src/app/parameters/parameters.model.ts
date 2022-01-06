import { AbstractControl } from "@angular/forms";

export interface IParameter{
    rounds:number,
    work_period_minute:number,
    work_period_seconde:number,
    rest_period_minute:number,
    rest_period_seconde:number
    work_period_total_millisecond:number,
    rest_period_total_millisecond:number,

}

