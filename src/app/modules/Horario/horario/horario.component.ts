import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NewrecursoComponent } from '../../recurso/components/newrecurso/newrecurso.component';
import { HorarioService } from '../../shared/services/horario.service';
import { NewHorarioComponent } from '../new-horario/new-horario.component';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  constructor(private horarioService: HorarioService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  displayedColumns: string[]=['Dia','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','actions'];
  dataSource= new MatTableDataSource<HorarioElement>();

  getHorarios(){
    this.horarioService.getHorario().subscribe((data:any) =>{
      console.log("respuesta de facultades",data);
      this.processProductResponse(data);

    },(errror:any)=>{
      console.log("error en faultades ")
    });

  }

  processProductResponse(resp: any){
    const dateFacultad: HorarioElement[] = [];
     if( resp.metadata[0].code == "00"){
       let listCFacultad = resp.faculdatResponse.facultad;

       listCFacultad.forEach((element: HorarioElement) => {
         dateFacultad.push(element);
       });

       //set the datasource
       this.dataSource = new MatTableDataSource<HorarioElement>(dateFacultad);
     }
  }

  openHorarioDialog(){
    const dialogRef = this.dialog.open( NewHorarioComponent , {
      width: '450px'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result==1){ 
        this.openSnackBar("Horario  Agregado", "Exitosamente");
        //this.getRecursos();
  
      
      }else if (result ==2){
        this.openSnackBar("se produjo un error al agregar el Horario ", "Error");
  
      }
    });


  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 2000
    })
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