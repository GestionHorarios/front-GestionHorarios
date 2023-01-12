import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UbicacionService } from '../../shared/services/ubicacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  constructor(private UbicacionService: UbicacionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUbicaciones();
    
  }

  displayedColumns: string[] = ['ubi_codigo', 'ubi_nombre', 'ubi_direccion','ubi_ciudad', 'actions'];
  dataSource = new MatTableDataSource<UbicacionElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getUbicaciones(){

    this.UbicacionService.getUbicaciones()
        .subscribe( (data:any) => {

          console.log("respuesta Ubicaciones : ", data);
          this.processUbicacionesResponse(data);

        }, (error: any) => {
          console.log("error: ", error);
        })
  }

  processUbicacionesResponse(resp: any){

    const dataUbicacion: UbicacionElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCUbicaciones = resp.ubicacionResponse.ubicacion;

      listCUbicaciones.forEach((element: UbicacionElement) => {
        dataUbicacion.push(element);
      });

      this.dataSource = new MatTableDataSource<UbicacionElement>(dataUbicacion);
      this.dataSource.paginator = this.paginator;
      
    }

}
}
export interface UbicacionElement {
  ubi_codigo:string,
  ubi_nombre:string,
  ubi_direccion:string,
  ubi_ciudad:string

}