import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RecursoModule } from '../recurso/recurso.module';
import { FacultadModule } from '../facultad/facultad.module';
import { UbicacionModule } from '../ubicacion/ubicacion.module';
import { TipoRecursoComponent } from '../TipoRecurso/tipo-recurso/tipo-recurso.component';
import { TipoRecursoModule } from '../TipoRecurso/tipo-recurso.module';
import { AsignaccionModule } from '../asignaccion/asignaccion.module';
import { HorarioModule } from '../Horario/horario.module';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecursoModule,
    FacultadModule,
    UbicacionModule,
    TipoRecursoModule,
    AsignaccionModule,
    HorarioModule
  
  ]
})
export class DashboardModule { }
