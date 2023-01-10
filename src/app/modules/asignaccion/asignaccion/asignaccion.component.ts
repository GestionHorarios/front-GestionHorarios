import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-asignaccion',
  templateUrl: './asignaccion.component.html',
  styleUrls: ['./asignaccion.component.css']
})
export class AsignaccionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[]=['fac_codigo','fac_nombre','ubicacion','actions'];
  dataSource= new MatTableDataSource<asignacionElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


}

export interface asignacionElement {
  rec_id:number;
  rec_idasignado:number;

}
