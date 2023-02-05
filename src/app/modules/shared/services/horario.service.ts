import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) { }

  getHorario(){
    const enpoint =`${base_url}/facultades`;
    return this.http.get(enpoint);

  }

  saveHorario(body:any){
    const endpoint =`${base_url}/horario/agregarDiaHiniHfinARecur`;
    return this.http.post(endpoint,body);
  }

  getCursos(fac_codigo:string){
    const endpoint = `${base_url}/cursos/facultad/${fac_codigo}`;
    return this.http.get(endpoint);
  }

  getCursosAsig(asig_cod:string){
    const endpoint = `${base_url}/cursos/asignatura/${asig_cod}`;
    return this.http.get(endpoint);
  }
}
