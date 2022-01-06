import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TimerComponent } from './timer/timer.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ParameterService } from './parameters/parameters.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    TimerComponent,
    ParametersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ParameterService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
