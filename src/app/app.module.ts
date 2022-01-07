import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TimerComponent } from './timer/timer.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ParameterService } from './parameters/parameters.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ExercisesChoiceComponent } from './exercises/exercises-choice/exercises-choice.component';
import { ExercisesDragDropComponent } from './exercises/exercises-drag-drop/exercises-drag-drop.component';
import { ExercisesService } from './exercises/exercises.service';

@NgModule({
  declarations: [
    HomeComponent,
    TimerComponent,
    ParametersComponent,
    ExercisesChoiceComponent,
    ExercisesDragDropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    
    
  ],
  providers: [ParameterService, ExercisesService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
