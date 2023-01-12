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
}
