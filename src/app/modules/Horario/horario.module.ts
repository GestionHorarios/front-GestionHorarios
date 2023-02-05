import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HorarioComponent } from './horario/horario.component';
import { NewHorarioComponent } from './new-horario/new-horario.component';



@NgModule({
  declarations: [
    HorarioComponent,
    NewHorarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HorarioModule { }
