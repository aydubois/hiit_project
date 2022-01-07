import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { timer, interval, takeUntil } from 'rxjs';
import { IExercise } from '../exercises/exercises.model';
import { ExercisesService } from '../exercises/exercises.service';
import { IParameter } from '../parameters/parameters.model';
import { ParameterService } from '../parameters/parameters.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timeLeft: Date
  totalTimeLeft:Date
  timeSpent:Date
  currentRound:number=1
  totalRounds:number
  interval:any
  firstInterval:any
  timeFirstInterval:number=5
  params:IParameter
  period:string="Travail"

  isStarted:boolean=false
  isPaused:boolean=false
  isFinished:boolean=false
  @Output() startEvent = new EventEmitter<boolean>()

  exercises:IExercise[]
  currentExercise:IExercise

  mySubscription:Array<any>= []

  constructor(private parameterService:ParameterService, private exerciseService: ExercisesService ) { }

  ngOnInit(): void {
    this.mySubscription[0] = this.exerciseService.getSelectedExercises().subscribe((exercises:IExercise[])=>{
      this.exercises = exercises
      this.currentExercise = exercises[0]
    })
    this.mySubscription[1] = this.parameterService.getParameter().subscribe(param => {
      this.params = param
      this.totalRounds = this.params.rounds
      this.timeLeft = new Date(0,0,0)
      this.timeLeft.setMilliseconds(this.params.work_period_total_millisecond)
      this.totalTimeLeft = new Date(0,0,0)
      this.totalTimeLeft.setMilliseconds((this.params.work_period_total_millisecond + this.params.rest_period_total_millisecond)*this.params.rounds)
      this.timeSpent = new Date(0,0,0)
    })
    
  }

  startTimer() {
    this.isStarted = true
    this.isPaused = false
    this.isFinished = false

    this.startEvent.emit(this.isStarted)
    
    this.unsubscribe()

    this.timeFirstInterval = 5
    this.firstInterval = interval(1000).pipe(takeUntil(timer(6000))).subscribe((t:any)=>{
      this.timeFirstInterval--
    }, ()=>{}, ()=>{
      this.interval = timer(0,1000)
      .subscribe((t:any) => {
        if(this.timeLeft.getSeconds() !== 0 ){
          if(this.timeLeft.getSeconds() === 1){
            this.playSound()
          }
          this.timeLeft = new Date(this.timeLeft)
          this.timeLeft.setSeconds(this.timeLeft.getSeconds()-1);
        }else{

          let periodCurrent = this.changePeriod()
          let milliSec = periodCurrent === "Travail"? this.params.work_period_total_millisecond : this.params.rest_period_total_millisecond
          
          this.timeLeft = new Date(0,0,0)
          this.timeLeft.setMilliseconds(milliSec)
        }
        this.totalTimeLeft = new Date(this.totalTimeLeft)
        this.totalTimeLeft.setSeconds(this.totalTimeLeft.getSeconds()-1);
        this.timeSpent = new Date(this.timeSpent)
        this.timeSpent.setSeconds(this.timeSpent.getSeconds()+1);
      })
    })
  }

  changePeriod(){
    if(this.currentRound === this.totalRounds){
      this.isStarted = false
      this.isFinished = true
      this.clearTimer()
    }else{

      this.period = this.period === "Travail" ? "Repos" : "Travail"
      if(this.period === "Travail"){
        this.setCurrentExercise()
        this.currentRound++
      }
    }
    return this.period
  }

  setCurrentExercise(){
    let index = this.exercises.indexOf(this.currentExercise)
    index++
    if(index === this.exercises.length ){
      index = 0
    }
    this.currentExercise = this.exercises[index]
  }
  clearTimer(){
    this.startEvent.emit(false)
    this.interval?.unsubscribe()
    console.log(typeof this.interval)
    this.currentRound = 1
    this.isStarted = false
    this.totalRounds = this.params.rounds
    this.timeLeft = new Date(0,0,0)
    this.timeLeft.setMilliseconds(this.params.work_period_total_millisecond)
    this.totalTimeLeft = new Date(0,0,0)
    this.totalTimeLeft.setMilliseconds((this.params.work_period_total_millisecond + this.params.rest_period_total_millisecond)*this.params.rounds)
    this.timeSpent = new Date(0,0,0)
  }
  pauseTimer() {
    this.isPaused = true
    this.interval.unsubscribe()
  }
  
  getMinutes(s:number) :number {
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    s = (s - secs) / 60
    let mins = s % 60
  
    return mins
  }
  getSecondes(s:number):number{
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    return secs
  }
  playSound(){
    let audio:HTMLAudioElement = new Audio("./../../assets/bip.mp3")
    audio.play()
  }

  unsubscribe(){
    if( this.firstInterval !== undefined && !this.firstInterval.closed){
      this.firstInterval.unsubscribe()
    }
    if( this.interval !== undefined && !this.interval.closed){
      this.interval.unsubscribe()
    }
  }
  ngOnDestroy(){
    this.unsubscribe()
    if(this.mySubscription.length != 0){
      this.mySubscription.forEach(sub => {
        sub.unsubscribe()
      });
    }
  }
}
