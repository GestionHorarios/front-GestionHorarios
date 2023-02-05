import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AsignaccionService } from 'src/app/modules/shared/services/asignaccion.service';
import { NewrecursoComponent } from '../../recurso/components/newrecurso/newrecurso.component';
import { NewAsignaccionComponent, Recurso } from '../new-asignaccion/new-asignaccion.component';



@Component({
  selector: 'app-asignaccion',
  templateUrl: './asignaccion.component.html',
  styleUrls: ['./asignaccion.component.css']
})
export class AsignaccionComponent implements OnInit {

  constructor(private asignaccionService: AsignaccionService,
    public dialog: MatDialog, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getAsignaccion();
  }
  displayedColumns: string[]=['rec_id','rec_codigo', 'facultad','rec_descripcion','ubicacion','recurso','recurso_descripcion', 'actions'];
  dataSource= new MatTableDataSource<asignacionElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getAsignaccion(){
    this.asignaccionService.getAsinaccion().subscribe((data:any) =>{

      console.log("respuesta recursos", data );
      this.processAsignaccionResponse(data);
  
    },(error:any)=>{
      console.log("error", error);
    })

  }

  processAsignaccionResponse(resp: any){
    const dateAsignacion: asignacionElement[]=[];
    if( resp.metadata[0].code == "00"){
      let listRecursos= resp.recursoResponse.recurso;
      let listRecursoshijos: any[]=[];
  
      listRecursos.forEach((element: asignacionElement) => {


        //element.facultad = element.facultad.fac_codigo;
        //element.ubicacion = element.ubicacion.ubi_codigo;
        //element.tiporecurso = element.tiporecurso.rectipo_codigo;

       // element.recurso=element.recurso[0].rec_id;
    
        dateAsignacion.push(element);
      });
  
      this.dataSource = new MatTableDataSource<asignacionElement>(dateAsignacion);
      this.dataSource.paginator = this.paginator;
    }
  

  }
  openAsignaccionDialog(){
    const dialogRef = this.dialog.open( NewAsignaccionComponent , {
      width: '450px'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result==1){ 
        this.openSnackBar("Asignaccion Agregada", "Exitosamente");
        this.getAsignaccion();
  
      
      }else if (result ==2){
        this.openSnackBar("se produjo un error al  realizar la Asignaccion ", "Error");
  
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 2000
    })
   }
        edit(rep_id:any, recursohijo:any ){

          const dialogRef = this.dialog.open( NewAsignaccionComponent , {
            width: '450px',
            data:{rep_id, recursohijo}


           });
           dialogRef.afterClosed().subscribe((result:any) => {
  
            if(result==1){ 
              this.openSnackBar("Asignaccion  desasignada", "Exitosamente");
              this.getAsignaccion();
        
            
            }else if (result ==2){
              this.openSnackBar("se produjo un error al  realizar la Asignaccion ", "Error");
        
            }
          });
 


}


}

export interface asignacionElement {
  rec_id:number;
  rec_codigo:string;
  rec_descripcion:string;
  facultad:any;
  recurso:any[];
  ubicacion:any;
 recurso_descripcion:any;

}

