import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AsignaccionComponent } from './asignaccion/asignaccion.component';
import { NewAsignaccionComponent } from './new-asignaccion/new-asignaccion.component';



@NgModule({
  declarations: [
    AsignaccionComponent,
    NewAsignaccionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AsignaccionModule { }
