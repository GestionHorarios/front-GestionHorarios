import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http: HttpClient) {
   }


   getUbicaciones(){
    const endpoint = `${base_url}/ubicaciones`;
    return  this.http.get(endpoint);

  }
}


