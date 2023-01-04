import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private http: HttpClient) { }

  savedocument(body: any) {
    const endpoint = `${base_url}/document`;
    return this.http.post(endpoint, body);
  }
}