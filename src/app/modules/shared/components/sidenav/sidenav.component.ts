import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  //variable que ayuda al control de tamaño y diseño responsivo
  mobileQuery: MediaQueryList;

  //vaiable que controla el menu
  menuNav=[
    {name:"Home",route:"home", icon:"home"},
    {name:"SubirArchivo", route:"home", icon:"unarchive"},
    {name:"AgregarInfrastructura", route:"home", icon:"add_circle"},
    {name:"Configurar", route:"home", icon:"brightness_low"},
    {name:"Agregar Cursos", route:"home", icon:"add"},
    {name:"Programar  Cursos", route:"home", icon:"calendar_today"}

  ]
  constructor(media: MediaMatcher) {
    this.mobileQuery=media.matchMedia('(max-width: 680px)');

   }

  ngOnInit(): void {
  }

}
