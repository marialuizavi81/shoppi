import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl='https://fakestoreapi.com/products'
  listaComprinhas: any[] = [];
  constructor(private http: HttpClient) {   }

  getproducts(): Observable<any[]> {
   return this.http.get<any[]>(this.apiUrl);
  }
}
