import { Component, OnInit, ViewChild } from '@angular/core';
import { FacultadService } from '../../shared/services/facultad.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent implements OnInit {

  constructor(private facultadService:  FacultadService) { }

  ngOnInit(): void {

    this.getFacultades();

  }
  displayedColumns: string[]=['fac_codigo','fac_nombre','ubicacion','actions'];
  dataSource= new MatTableDataSource<FacultadElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getFacultades(){
    this.facultadService.getFacultades().subscribe((data:any) =>{
      console.log("respuesta de facultades",data);
      this.processProductResponse(data);

    },(errror:any)=>{
      console.log("error en faultades ")
    });

  }

  processProductResponse(resp: any){
    const dateFacultad: FacultadElement[] = [];
     if( resp.metadata[0].code == "00"){
       let listCFacultad = resp.faculdatResponse.facultad;

       listCFacultad.forEach((element: FacultadElement) => {
      element.ubicacion = element.ubicacion.ubi_codigo;
         dateFacultad.push(element);
       });

       //set the datasource
       this.dataSource = new MatTableDataSource<FacultadElement>(dateFacultad);
       this.dataSource.paginator = this.paginator;
     }
  }

  
  
   }

export interface FacultadElement{
  fac_codigo:string;
  fac_nombre: string;
  ubicacion : any;

}
