import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IParameter } from "./parameters.model";

@Injectable()
export class ParameterService{
    private subject:Subject<IParameter> = new Subject<IParameter>()
    getParameter():Subject<IParameter>{
        setTimeout(()=>{
            this.subject.next(PARAM)
        },100)
        return this.subject
    }
    saveParameter(param:IParameter){
        PARAM.rounds=param.rounds,
        PARAM.rest_period_minute=param.rest_period_minute,
        PARAM.rest_period_seconde=param.rest_period_seconde,
        PARAM.work_period_minute=param.work_period_minute,
        PARAM.work_period_seconde=param.work_period_seconde,
        
        PARAM.rest_period_total_millisecond=PARAM.rest_period_minute*60_000+PARAM.rest_period_seconde*1_000
        PARAM.work_period_total_millisecond=PARAM.work_period_minute*60_000+PARAM.work_period_seconde*1_000
        this.subject.next(PARAM)
    }

}
const PARAM:IParameter = {
    rounds:12,
    rest_period_minute:0,
    rest_period_seconde:10,
    work_period_minute:0,
    work_period_seconde:30,
    rest_period_total_millisecond:10*1_000,
    work_period_total_millisecond:30*1_000
}
