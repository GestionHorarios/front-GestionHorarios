import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsignaccionService } from 'src/app/modules/shared/services/asignaccion.service';



@Component({
  selector: 'app-asignaccion',
  templateUrl: './asignaccion.component.html',
  styleUrls: ['./asignaccion.component.css']
})
export class AsignaccionComponent implements OnInit {

  constructor(private asignaccionService: AsignaccionService ) { }

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
export interface recursoElement{
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