import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsignaccionService {

  constructor(private http: HttpClient) { }
 
 
  getAsinaccion(){

    const endpoint = `${base_url}/recursos`;
    return  this.http.get(endpoint);
    
  }

  saveAsignaccion(body:any){
    const endpoint = `${base_url}/recursos/asignar`;
    return  this.http.post(endpoint,body);

  }

  getRecursosAmbientes(fac_codigo:string){
    const endpoint = `${base_url}/recursos/facaudisalasalon/${fac_codigo}`;
    return this.http.get(endpoint);
  }

  getRecursosInsTec(fac_codigo:string)
  {
    const endpoint = `${base_url}/recursos/facudifaudisalasalon/${fac_codigo}`;
    return this.http.get(endpoint);

  }


  updateAsignacion(body: any){

    const endpoint = `${base_url}/recursos/desasignar/`;
    return this.http.post(endpoint,body);
  }



}
