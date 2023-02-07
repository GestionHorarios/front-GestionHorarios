import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NewrecursoComponent } from '../../recurso/components/newrecurso/newrecurso.component';
import { AsignaccionService } from '../../shared/services/asignaccion.service';
import { FacultadService } from '../../shared/services/facultad.service';
import { HorarioService } from '../../shared/services/horario.service';
import { NewHorarioComponent } from '../new-horario/new-horario.component';
import { DOCUMENT } from '@angular/common';
import { RecursoService } from '../../shared/services/recurso.service';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

export interface facultadeselement{

  fac_codigo: string;
  fac_nombre: string;
  ubicacion: any ;

}

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent implements OnInit {
  facultades: facultadeselement[] = [];
  tipoRecursoHijos: Recurso[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private horarioService: HorarioService,
    private AsignaccionService: AsignaccionService,
    private FacultadService: FacultadService,
    private recursoService: RecursoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.facultadesbuscar();
  }
  displayedColumns: string[] = [
    'rec_id',
    'rec_codigo',
    'facultad',
    'rec_descripcion',
    'rec_capmax',
    'rec_nombre',
    'tiporecurso',
    'ubicacion',
    'actions',
  ];
  dataSource = new MatTableDataSource<RecursoElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getHorarios() {
    this.horarioService.getHorario().subscribe(
      (data: any) => {
        console.log('respuesta de facultades', data);
        this.processRecursosResponse(data);
      },
      (errror: any) => {
        console.log('error en faultades ');
      }
    );
  }

  llamarHorario(rec_codigo: string): void {
    //this.document.location.href = "http://localhost:8080/horario/vista/"+rec_codigo;
    window.open('http://localhost:8080/horario/vista/' + rec_codigo, '_blank');
  }
  processRecursosResponse(resp: any) {
    const dataRecurso: RecursoElement[] = [];

    if (resp.metadata[0].code == '00') {
      let listRecursos = resp.recursoResponse.recursoDto;
      console.log("esto es list r",listRecursos, "esto es ", resp)

     if(listRecursos!=null){
      listRecursos.forEach((element: RecursoElement) => {
        //element.facultad = element.facultad.fac_codigo;
        //element.ubicacion = element.ubicacion.ubi_codigo;
        //element.tiporecurso = element.tiporecurso.rectipo_codigo;
        dataRecurso.push(element);
      });
    }else{
      
    }
      this.dataSource = new MatTableDataSource<RecursoElement>(dataRecurso);
      this.dataSource.paginator = this.paginator;
    }
  }

  openHorarioDialog() {
    const dialogRef = this.dialog.open(NewHorarioComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(({ codigo, mensaje }) => {
      if (codigo == 1) {
        this.openSnackBar(mensaje, 'Exitosamente');
        this.getRecursos();
      } else if (codigo == 2) {
        this.openSnackBar(mensaje, 'Error');
      }
      console.log('error', codigo, 'esto es', mensaje);
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  facultadesbuscar() {
    this.FacultadService.getFacultades().subscribe((data: any) => {
      console.log('facultades', data);
      this.procesarfacultades(data);
    });
  }

  procesarfacultades(res: any) {
    const dataTipoRecursosHijos: facultadeselement[] = [];
    if (res.metadata[0].code == '00') {
      let listHijos = res.faculdatResponse.facultad;
      console.log(listHijos);
      listHijos.forEach((element: facultadeselement) => {
        dataTipoRecursosHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.facultades = dataTipoRecursosHijos;
    }
  }

  ambientes(id: string) {
    //console.log("hujos"+id);
    this.AsignaccionService.getRecursosAmbientes(id).subscribe((data: any) => {
      console.log('hijos: ', data);
      this.procesarTipoAmbientes(data);
    });
  }

  procesarTipoAmbientes(res: any) {
    const dataTipoRecursosHijos: RecursoElement[] = [];
    if (res.metadata[0].code == '00') {
      let listHijos = res.recursoResponse.recurso;
      listHijos.forEach((element: RecursoElement) => {
        dataTipoRecursosHijos.push(element);
      });
      //cargar los datos en el seelct hijos
      this.dataSource = new MatTableDataSource<RecursoElement>(
        dataTipoRecursosHijos
      );
      this.dataSource.paginator = this.paginator;
    }
  }

  buscarcod(rec_codigo: any) {
    if (rec_codigo.length === 0) {
      return this.getRecursos();
    }

    this.recursoService
      .getRecursoRec_Codigo(rec_codigo)
      .subscribe((resp: any) => {
        this.processRecursosResponse2(resp);
        console.log(resp);
      });
  }

  getRecursos() {
    this.recursoService.getRecursos().subscribe(
      (data: any) => {
        console.log('respuesta recursos', data);
        this.processRecursosResponse(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  processRecursosResponse2(resp: any) {
    const dataRecurso: RecursoElement[] = [];

    if (resp.metadata[0].code == '00') {
      let listRecursos = resp.recursoResponse.recurso;

      listRecursos.forEach((element: RecursoElement) => {
        //element.facultad = element.facultad.fac_codigo;
        //element.ubicacion = element.ubicacion.ubi_codigo;
        //element.tiporecurso = element.tiporecurso.rectipo_codigo;
        dataRecurso.push(element);
      });

      this.dataSource = new MatTableDataSource<RecursoElement>(dataRecurso);
      this.dataSource.paginator = this.paginator;
    }
  }

  delete(rec_id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { rec_id: rec_id, module: 'horario' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('HORARIO DE RECURSO ELIMINADO', 'Exitosamente');
        this.getRecursos();
      } else if (result == 2) {
        this.openSnackBar('se produjo un error al Eliminar  Horario', 'Error');
      }
    });
  }
}
export interface HorarioElement{
  hor_id: Number,
  hor_dia: String,
  hor_hora_inicio: String,
  hor_hora_fin: String,
  curso_cur_id: any,
  recurso_rec_id: any,


}

export interface RecursoElement{
  rec_id: number;
  rec_codigo: string;
  rec_descripcion: string;
  facultad: any;
  tiporecurso: any;
  rec_tipo:string;
  rec_capmax: string;
  ubicacion: any;
  rec_nombre: string;
}

export interface Recurso {
  rec_codigo: string;
  rec_id:number;
  rectipo_nombre: string;
  tiporecurso: any;
}