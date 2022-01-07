import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper'
import {MatButtonModule} from '@angular/material/button'
import {DragDropModule} from '@angular/cdk/drag-drop'
@NgModule({
    exports:[
        MatStepperModule,
        MatButtonModule,
        DragDropModule,
    ]
})
export class MaterialModule{}