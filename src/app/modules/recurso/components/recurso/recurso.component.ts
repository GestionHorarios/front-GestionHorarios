import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit,ViewChild} from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { RecursoService } from 'src/app/modules/shared/services/recurso.service';
import { NewrecursoComponent } from '../newrecurso/newrecurso.component';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {

  constructor(private recursoService: RecursoService,
   public dialog: MatDialog, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getRecursos();
    
  }
  displayedColumns: string[]=['rec_id','rec_codigo','facultad','rec_descripcion', 'rec_capmax','rec_nombre','tiporecurso','ubicacion', 'actions'];
  dataSource= new MatTableDataSource<RecursoElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


 getRecursos(){
  this.recursoService.getRecursos().subscribe((data:any) =>{

    console.log("respuesta recursos", data );
    this.processRecursosResponse(data);

  },(error)=>{
    console.log("error", error);
  })
 }

 processRecursosResponse( resp:any){
  const dataRecurso: RecursoElement[]=[];

  if( resp.metadata[0].code == "00"){
    let listRecursos= resp.recursoResponse.recurso;

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

 openRecursoDialog(){
  const dialogRef = this.dialog.open( NewrecursoComponent , {
    width: '450px'
  });

  dialogRef.afterClosed().subscribe((result:any) => {

    if(result==1){ 
      this.openSnackBar("Recurso Agregado", "Exitosamente");
      this.getRecursos();

    
    }else if (result ==2){
      this.openSnackBar("se produjo un error al agrega recurso ", "Error");

    }
  });

 }

 edit(rec_id:number,rec_codigo:string, rectipo_codigo:any, fac_codigo:any,rec_capmax:number,rec_nombre:string,rec_descripcion:string,ubi_codigo:any)
 {

  const dialogRef = this.dialog.open( NewrecursoComponent , {
    width: '450px',
    data:{rec_id: rec_id, rec_codigo: rec_codigo, rectipo_codigo: rectipo_codigo, fac_codigo: fac_codigo, rec_capmax: rec_capmax, rec_nombre: rec_nombre, rec_descripcion: rec_descripcion, ubi_codigo: ubi_codigo }
  });

  dialogRef.afterClosed().subscribe((result:any) => {

    if(result==1){ 
      this.openSnackBar("Recurso editado", "Exitosamente");
      this.getRecursos();

    
    }else if (result ==2){
      this.openSnackBar("se produjo un error al editar recurso ", "Error");

    }
  });

 }
 
  delete(rec_id: any){
    const dialogRef = this.dialog.open( ConfirmComponent , {
      width: '450px',
      data:{rec_id: rec_id}
    });

  
  
    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result==1){ 
        this.openSnackBar("Recurso Borrado", "Exitosamente");
        this.getRecursos();
  
      
      }else if (result ==2){
        this.openSnackBar("se produjo un error al actualizar recurso ", "Error");
  
      }
    });

   

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 2000
    })
   }

  buscarcod(rec_codigo: any){
   if( rec_codigo.length === 0){
    return this.getRecursos();
   }

   this.recursoService.getRecursoRec_Codigo(rec_codigo)
   .subscribe( (resp: any) =>{
    
    this.processRecursosResponse(resp);
  console.log(resp);

   })

  }




}
export interface RecursoElement{
  rec_id: number;
  rec_codigo: string;
  rec_descripcion: string;
  fac_codigo: any;
  rectipo_codigo: any;
  rec_tipo:string;
  rec_capmax: string;
  ubi_codigo: any;
  rec_nombre: string;
}