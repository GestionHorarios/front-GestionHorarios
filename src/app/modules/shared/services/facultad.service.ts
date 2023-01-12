import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private http: HttpClient) { 
    
  }
  /**
   * OBTENGO TODAS LAS FACULTADES 
   */

  getFacultades(){
    const endpoint = `${base_url}/facultades`;
    return  this.http.get(endpoint);

  }
}
