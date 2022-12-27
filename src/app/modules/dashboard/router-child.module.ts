import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FacultadComponent } from '../facultad/facultad/facultad.component';
import { RecursoComponent } from '../recurso/components/recurso/recurso.component';
import { TipoRecursoComponent } from '../TipoRecurso/tipo-recurso/tipo-recurso.component';
import { UbicacionComponent } from '../ubicacion/ubicacion/ubicacion.component';
import { HomeComponent } from './components/home/home.component';

 const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recurso', component: RecursoComponent },
    { path: 'prueba', component: FacultadComponent },
    { path: 'TipoRecurso', component: TipoRecursoComponent }
   
 ]
@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
