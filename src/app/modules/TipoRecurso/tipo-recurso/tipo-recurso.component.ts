import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoRecursoService } from '../../shared/services/tipo-recurso.service';

@Component({
  selector: 'app-tipo-recurso',
  templateUrl: './tipo-recurso.component.html',
  styleUrls: ['./tipo-recurso.component.css']
})
export class TipoRecursoComponent implements OnInit {

  constructor(private TipoRecursoService: TipoRecursoService ) { }

  ngOnInit(): void {
    this.getTipoRecurso();
  }

  displayedColumns: string[]=['rectipo_codigo','rectipo_nombre','tiporecurso','actions'];
  dataSource= new MatTableDataSource<TipoRecursoElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getTipoRecurso(){
    this.TipoRecursoService.getTipoRecursos().subscribe((data:any) =>{
      console.log("respuesta de Recursos",data);
      this.processTipoRecursoResponse(data);

    },(errror:any)=>{
      console.log("error en TipoRecursos ")
    });

  }

  processTipoRecursoResponse(resp: any){
    const dateTipoRecurso: TipoRecursoElement[] = [];
     if( resp.metadata[0].code == "00"){
       let listcTipoRecusro = resp.tiporecursoResponse.tiporecurso;

       listcTipoRecusro.forEach((element: TipoRecursoElement) => {
        if(element.tiporecurso==null){

          element.tiporecurso = "NUll";
        
        }
        element.tiporecurso = element.tiporecurso.rectipo_codigo;
         dateTipoRecurso.push(element);
       });

       //set the datasource
       this.dataSource = new MatTableDataSource<TipoRecursoElement>(dateTipoRecurso);
       this.dataSource.paginator = this.paginator;
     }
  }

}

export interface TipoRecursoElement{
  rectipo_codigo:string;
  rectipo_nombre:string;
  tiporecurso:any;
}

