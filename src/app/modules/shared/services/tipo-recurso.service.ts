import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TipoRecursoService {

  constructor(private http: HttpClient) { }

  getTipoRecursos(){

    const endpoint = `${base_url}/tiporecursos`;
    return  this.http.get(endpoint);

  }

  
}